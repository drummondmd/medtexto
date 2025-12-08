"use client";

import { Fragment, useEffect, useState } from "react";

import { CalculadoraEstrutura } from "@/lib/calculadoras/estrutura/calcType";

import classes from "./construtor-de-calculadora.module.css";

export type CalculadoraFE = Omit<CalculadoraEstrutura, "calculadorasRelacionadas"> & {
  calculadorasRelacionadas: CalculadoraEstrutura[] | [];
};

export default function ConstrutorDeCalculadora({ calc }: { calc: any }) {
  ///apagar não está apagando formData

  const parsedCalc = calc;
  ///parametros
  const initialDataForm: { [key: string]: string | number } = {};
  const entradas = parsedCalc.entradas;
  entradas.map((entrada) => {
    if (entrada.inputType === "select") {
      const defaultChecked = entrada.entradas
        .map((input) => {
          const valueChecked = input.isDefault == true ? input.value : null;
          return valueChecked;
        })
        .filter((elem) => elem != null);
      const value = defaultChecked[0];
      initialDataForm[entrada.nome] = value || "";
    } else {
      initialDataForm[entrada.nome] = "";
    }
  });
  ///states
  const [displayCalc, setDisplayCalc] = useState(parsedCalc);
  const [formData, setFormData] = useState(initialDataForm);
  const [resultado, setResultado] = useState([]);
  ///abrir aba de outras informações
  const [anotherInfo, setAnother] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  ///depois fazer atualização dos valores vindos de outra formula. Funciona no slug da propria calculadora, mas não nas demais.

  function modifyPar() {
    const parametros = {};
    const entradasTemp = displayCalc.entradas;

    entradasTemp.map((entrada) => {
      parametros[entrada.nome] = formData[entrada.nome] || "";
    });

    setFormData(parametros);
  }

  // useEffect(() => {
  //   modifyPar();
  // }, [displayCalc]);

  ///functionparaMudarDisplay
  const handleCalcChange = (calc) => {
    setDisplayCalc(calc);
    modifyPar();
  };

  const onDelete = () => {
    setDisplayCalc(parsedCalc);
    setResultado([]);
    setFormData(initialDataForm);
  };

  ///function para gerar jsx com base no array
  function jsxForm(array: CalculadoraFE) {
    return array["entradas"].map((entrada) => (
      ///modificar para li? dps
      <Fragment key={entrada.nome}>
        <div className={`${classes.containerEntrada} row my-1 p-2`}>
          <div className="col-lg-6">
            <div>
              <label className="form-label">{entrada.displayNome || entrada.nome}</label>
            </div>
            <span className="form-text">{entrada.obs}</span>
          </div>
          <div className="col-lg-6 my-1 p-2">
            <div className="row">
              {/* vai depender do input */}
              {/* input normal */}
              {entrada.inputType === "input" && (
                <>
                  <div className="col-8">
                    <input
                      key={entrada.nome}
                      type={entrada.tipo}
                      name={entrada.nome}
                      value={formData[entrada.nome] || ""}
                      onChange={handleChange}
                      className="form-control"
                      placeholder={entrada.placeholder}
                    ></input>
                  </div>
                  <div className="col-4">{entrada.unidade}</div>
                </>
              )}

              {entrada.inputType === "select" &&
                entrada["entradas"].map((input) => (
                  <Fragment key={input.nome}>
                    <div className="col m-2">
                      <input
                        className="btn-check"
                        name={entrada.nome}
                        id={entrada.nome + input.nome}
                        type={input.tipo}
                        value={input.value ?? input.nome}
                        checked={formData[entrada.nome] == (input.value.toString() || input.nome)}
                        onChange={handleChange}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor={entrada.nome + input.nome}
                      >
                        {input.displayNome || input.nome}
                      </label>
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </Fragment>
    ));
  }

  const isFormValid = Object.values(formData).every((val) => val !== "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  ///use Effect do resultado
  useEffect(() => {
    const fetchData = async () => {
      if (!isFormValid) return; // Só faz a requisição se todos os campos estiverem preenchidos
      setIsLoading(true);
      try {
        const response = await fetch(`/api/calculadoras/${displayCalc.functionLogic}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setIsLoading(false);

        if (!data) return; /// se retornar nulo, nada a se fazer
        if (data.erro || data.error) {
          setResultado((prevResultado) => [...prevResultado, data.erro || data.error]);
        } else {
          setResultado((prevResultado) => {
            const formula = Object.keys(data)[0]; // nome da fórmula
            const novaClassificacao = Object.values(data)[1];
            const novaLinha = `${formula} : ${Object.values(data)[0]}${novaClassificacao ? " (" + novaClassificacao + ")" : ""}`;

            const existenteIndex = prevResultado.findIndex((item) =>
              item.startsWith(formula + " :")
            );

            if (existenteIndex !== -1) {
              const novoArray = [...prevResultado];
              novoArray[existenteIndex] = novaLinha;
              return novoArray;
            } else {
              return [...prevResultado, novaLinha];
            }
          });
        }
      } catch (error) {
        console.error("Erro ao calcular:", error);
      }
    };

    fetchData();
  }, [formData, isFormValid, displayCalc.functionLogic]); // O efeito será acionado sempre que formData mudar

  ///copyTextTo clipboard

  function copyText() {
    let string = "";
    if (resultado.length > 1) {
      for (let i = 0; i < resultado.length; i++) {
        if (i === resultado.length - 1) {
          string = string + resultado[i] + ".";
        } else {
          string = string + resultado[i] + "; ";
        }
      }
    } else {
      string = resultado[0];
    }

    navigator.clipboard.writeText(string);
  }

  return (
    <>
      <div className="row container my-1">
        <div>
          <div className="h2 my-3">{displayCalc.titulo}</div>
          <p>{displayCalc.descricao}</p>
        </div>
        {/* Primeira coluna */}
        <div className="col-lg-7 mx-1">
          <div className="my-2">
            <div className="row">
              <div className="col-md-4">
                <div>Calculadora:</div>
                <div
                  role="buttom"
                  onClick={() => setDisplayCalc(parsedCalc)}
                  className={` ${displayCalc.titulo === parsedCalc.titulo ? "btn-secondary" : "btn-outline-secondary"} btn mx-2`}
                >
                  {displayCalc.titulo}
                </div>
              </div>
              <div className="col-md-8">
                {parsedCalc["calculadorasRelacionadas"].length > 0 && (
                  <>
                    <div>Calculadoras Relacionadas:</div>
                    <div>
                      {parsedCalc["calculadorasRelacionadas"].map((segCalc) => {
                        return (
                          <div
                            key={segCalc.slug}
                            className={` ${displayCalc.titulo === segCalc.titulo ? "btn-secondary" : "btn-outline-secondary"} btn mx-2`}
                            role="buttom"
                            onClick={() => handleCalcChange(segCalc)}
                          >
                            {segCalc.titulo}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {jsxForm(displayCalc)}
        </div>

        {/* Segunda Coluna */}
        <div className={`col-lg-4`}>
          <div className={`${classes.resultadoContainer} pb-5 pt-3 px-3`}>
            <h4>Resultado:</h4>
            {isLoading && <p>Calculando...</p>}
            {resultado.length > 0 ? (
              <div>
                <div>
                  {resultado.map((elem) => (
                    <p key={elem}>{elem}</p>
                  ))}
                </div>
                <div className="flex flex-row">
                  <div
                    role="button"
                    className="w-full md:w-1/2 border m-2 p-2 hover:bg-white hover:font-medium rounded text-center "
                    onClick={copyText}
                  >
                    Copiar
                  </div>
                  <div
                    role="button"
                    className=" w-full md:w-1/2 border m-2 p-2 hover:bg-white hover:font-medium rounded text-center "
                    onClick={onDelete}
                  >
                    Apagar
                  </div>
                </div>
              </div>
            ) : (
              <div className="">Preencha todos os campos</div>
            )}
          </div>
          <div className={`${classes.resultadoAnother} p-3 my-3`}>
            <div className="d-flex" onClick={() => setAnother((current) => !current)}>
              <div>
                <h6>Referencias e Evidencias:</h6>
              </div>
            </div>
            {anotherInfo && (
              <div>
                <div className="my-2 border-bottom py-2">{displayCalc.evidencia}</div>
                <ul className="p-0">
                  {displayCalc["referencias"].map((referencia) => {
                    return (
                      <li key={referencia.titulo} className="list-group-item">
                        <div className="card">
                          <a
                            target="_blank"
                            key={referencia.titulo}
                            href={referencia.link}
                            className="link-dark link-underline-opacity-0 link-underline-opacity-75-hover"
                          >
                            <div className="card-body">
                              <div className="card-title">{referencia.titulo}</div>
                              {/* <div className="card-text">{referencia.descricao}</div> */}
                            </div>
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
