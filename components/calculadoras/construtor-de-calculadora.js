'use client'

import { Fragment, useEffect, useState } from "react";
import classes from "./construtor-de-calculadora.module.css"
import Link from "next/link";


export default function ConstrutorDeCalculadora({ calc }) {


    ///apagar não está apagando formData


    calc = JSON.parse(calc)
    ///parametros

    let parametros = {}
    let entradas = calc.entradas;
    entradas.map((entrada) => {
        if (entrada.inputType === "select") {
            let defaultChecked = entrada.entradas.map((input) => {
                let valueChecked = input.isDefault == "true" ? input.value : null
                return valueChecked
            }).filter((elem) => elem != null)
            let value = defaultChecked[0];
            parametros[entrada.nome] = value || ""
        } else {
            parametros[entrada.nome] = entrada.defaultValue || ""
        }
    })

    ///states
    const [displayCalc, setDisplayCalc] = useState(calc)
    const [formData, setFormData] = useState(parametros)
    const [resultado, setResultado] = useState([])
    ///abrir aba de outras informações
    const [anotherInfo, setAnother] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    ///depois fazer atualização dos valores vindos de outra formula. Funciona no slug da propria calculadora, mas não nas demais.


    function modifyPar() {
        parametros = {}
        entradas = displayCalc.entradas;

        entradas.map((entrada) => {
            parametros[entrada.nome] = formData[entrada.nome] || ""
        })

        setFormData(parametros)

    }

    useEffect(() => {
        modifyPar();


    }, [displayCalc])



    ///function para gerar jsx com base no array
    function jsxForm(array) {
        return (
            array["entradas"].map((entrada) =>
                ///modificar para li? dps
                <Fragment key={entrada.nome}>
                    <div className={`${classes.containerEntrada} row my-1 p-2`}>

                        <div className="col-lg-6" >
                            <div>
                                <label className="form-label">{entrada.displayNome || entrada.nome}</label>
                            </div>
                            <span className="form-text">{entrada.obs}</span>
                        </div>
                        <div className="col-lg-6 my-1 p-2">
                            <div className="row">
                                {/* vai depender do input */}
                                {/* input normal */}
                                {(entrada.inputType === "input") &&
                                    <>
                                        <div className="col-8"><input key={entrada.nome} type={entrada.tipo} name={entrada.nome} value={formData.nome} defaultValue={entrada.defaultValue || null} onChange={handleChange} className="form-control" placeholder={entrada.placeholder}></input></div>
                                        <div className="col-4">{entrada.unidade}</div>
                                    </>
                                }

                                {(entrada.inputType === "select") && entrada["entradas"].map((input) =>


                                    <Fragment key={input.nome}>
                                        <div className="col m-2">
                                            <input className="btn-check" name={entrada.nome} id={entrada.nome + input.nome} type={input.tipo} value={input.value ?? input.nome} defaultChecked={input.isDefault == "true" && true} onChange={handleChange} />
                                            <label className="btn btn-outline-secondary" htmlFor={entrada.nome + input.nome} >{input.displayNome || input.nome}</label>


                                        </div>


                                    </Fragment>


                                )}




                            </div>
                        </div>

                    </div>
                </Fragment>




            )

        )

    }

    const isFormValid = Object.values(formData).every((val) => val !== "");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    ///use Effect do resultado
    useEffect(() => {
        const fetchData = async () => {
            if (!isFormValid) return; // Só faz a requisição se todos os campos estiverem preenchidos
            setIsLoading(true)
            try {
                const response = await fetch(`/api/calculadoras/${displayCalc.functionLogic}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                setIsLoading(false)
                if (data.erro || data.error) {
                    setResultado([...resultado, data.erro || data.error])
                } else {
                    setResultado((prevResultado) => {
                        const formula = Object.keys(data)[0]; // nome da fórmula
                        const novaClassificacao = Object.values(data)[1];
                        const novaLinha = `${formula} : ${Object.values(data)[0]}${novaClassificacao ? " (" + novaClassificacao + ")" : ""}`;

                        const existenteIndex = prevResultado.findIndex(item => item.startsWith(formula + " :"));

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
    }, [formData]); // O efeito será acionado sempre que formData mudar

    ///copyTextTo clipboard

    function copyText() {
        let string = "";
        if (resultado.length > 1) {
            for (let i = 0; i < resultado.length; i++) {
                if (i === resultado.length - 1) {
                    string = string + resultado[i] + "."
                } else {
                    string = string + resultado[i] + "; "

                }


            }
        } else {
            string = resultado[0]
        }

        navigator.clipboard.writeText(string)

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
                                <div role="buttom" onClick={() => setDisplayCalc(calc)} className={` ${displayCalc.titulo === calc.titulo ? "btn-secondary" : "btn-outline-secondary"} btn mx-2`}>
                                    {calc.titulo}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div>
                                    Calculadoras Relacionadas:
                                </div>
                                <div>{calc["calculadorasRelacionadas"].map((segCalc) => {
                                    console.log(segCalc)
                                    return (
                                        <div key={segCalc.slug} className={` ${displayCalc.titulo === segCalc.titulo ? "btn-secondary" : "btn-outline-secondary"} btn mx-2`} role="buttom" onClick={() => setDisplayCalc(segCalc)}>
                                            {segCalc.titulo}
                                        </div>
                                    )
                                })}
                                </div>

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
                        {resultado.length > 0 ?
                            <div>
                                <div>
                                    {resultado.map((elem) => <p key={elem}>{elem}</p>)}
                                </div>
                                <div className="row">
                                    <div role="button" className="btn col-md-6 " onClick={copyText} >Copiar</div>
                                    <div role="button" className=" btn col-md-6 " onClick={() => { setResultado([]), modifyPar() }}>
                                        Apagar</div>


                                </div>


                            </div> :
                            <div className="">Preencha todos os campos</div>}

                    </div>
                    <div className={`${classes.resultadoAnother} p-3 my-3`}>
                        <div className="d-flex" onClick={() => setAnother((current) => !current)}>
                            <div>
                                <h6>Referencias e Evidencias:</h6>
                            </div>
                        </div>
                        {anotherInfo &&
                            <div>
                                <div className="my-2 border-bottom py-2">{displayCalc.evidencia}</div>
                                <ul className="p-0">
                                    {displayCalc["referencias"].map((referencia) => {
                                        return (
                                            <li key={referencia.titulo} className="list-group-item">
                                                <div className="card">
                                                    <Link key={referencia.titulo} href={referencia.link} className="link-dark link-underline-opacity-0 link-underline-opacity-75-hover">

                                                        <div className="card-body">
                                                            <div className="card-title">{referencia.titulo}</div>
                                                            {/* <div className="card-text">{referencia.descricao}</div> */}

                                                        </div>
                                                    </Link>

                                                </div>



                                            </li>



                                        )
                                    })}

                                </ul>

                            </div>}

                    </div>
                </div>


            </div >

        </>
    )
}