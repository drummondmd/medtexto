// app/admin/calculadoras/editar/[slug]/page.js
"use client";

import { useState } from "react";

export default function EditarCalculadoraPage({ calculadora, todasCalculadoras }) {
  return <p>Em breve esta funcionalidade</p>;
  ///parsing JSON devido ao id que quebra o react
  calculadora = JSON.parse(calculadora);
  todasCalculadoras = JSON.parse(todasCalculadoras);

  const [form, setForm] = useState(calculadora);
  const [entradas, setEntradas] = useState(calculadora.entradas);
  const [referencias, setReferencias] = useState(calculadora.referencias);

  ///sem função a principio, mas mudando o form conforme troca de digitação
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  ///selecionados em calculadoras relacionadas
  const handleSelectRelacionadas = (e) => {
    const options = Array.from(e.target.options);
    const selecionados = options.filter((o) => o.selected).map((o) => o.value);
    setForm((prev) => ({ ...prev, calculadorasRelacionadas: selecionados }));
  };

  ///binding as calculadoras que não consegui no formData
  const formAction = updateCalculadora.bind(
    null,
    form.calculadorasRelacionadas,
    entradas,
    referencias
  );

  ///handle de mudança das entradas
  function onChangeEntradas(e) {
    const { name, value } = e.target;
    const [nameofInput, indexOfChange, indexOfSubentrada] = name.split("-");
    const newEntradas = entradas.map((entrada, index) => {
      if (index == indexOfChange) {
        if (indexOfSubentrada != undefined) {
          const novasSubEntradas = entrada.entradas.map((subentrada, subIndex) => {
            if (subIndex == indexOfSubentrada) {
              return { ...subentrada, [nameofInput]: value };
            } else {
              return subentrada;
            }
          });
          return { ...entrada, entradas: novasSubEntradas };
        } else {
          return { ...entrada, [nameofInput]: value };
        }
      } else {
        return entrada;
      }
    });
    setEntradas(newEntradas);
  }

  //handle de mudança das referencias
  function onChangeReferencias(e) {
    const { name, value } = e.target;
    const [nameofInput, indexOfChange] = name.split("-");
    const newReferencias = referencias.map((referencia, index) => {
      if (index == indexOfChange) {
        return { ...referencia, [nameofInput]: value };
      } else {
        return referencia;
      }
    });
    setReferencias(newReferencias);
  }

  // if (loading || !form) return <p>Carregando...</p>;

  return (
    <div className="container mt-4 mb-5">
      {" "}
      {/* Adicionado mb-5 para espaço no final */}
      <h2 className="mb-4">Editar Calculadora</h2>
      <form action={formAction} className="needs-validation" noValidate>
        {/* Campos Principais */}
        <div className="card mb-4">
          <div className="card-header">Informações Principais</div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Título
              </label>
              <input
                id="titulo"
                name="titulo"
                className="form-control"
                value={form.titulo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                className="form-control"
                value={form.descricao}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="instrucoes" className="form-label">
                Instruções
              </label>
              <textarea
                id="instrucoes"
                name="instrucoes"
                className="form-control"
                value={form.instrucoes}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="slug" className="form-label">
                  Slug (Identificador URL)
                </label>
                <input
                  id="slug"
                  name="slug"
                  className="form-control"
                  readOnly
                  value={form.slug}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="functionLogic" className="form-label">
                  Nome da Função Lógica
                </label>
                <input
                  id="functionLogic"
                  name="functionLogic"
                  className="form-control"
                  value={form.functionLogic}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="evidencia" className="form-label">
                Evidência
              </label>
              <input
                id="evidencia"
                name="evidencia"
                className="form-control"
                value={form.evidencia}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Entradas da Calculadora */}
        <div className="card mb-4">
          <div className="card-header">Entradas da Calculadora</div>
          <div className="card-body">
            <div className="row g-3">
              {" "}
              {/* Usando g-3 para espaçamento entre colunas */}
              {form.entradas.map((entrada, index) => (
                <div key={entrada._id || index} className="col-md-6 col-lg-4">
                  <div className="border p-3 rounded h-100">
                    {" "}
                    {/* Borda para separar visualmente */}
                    <h6 className="mb-3">Entrada #{index + 1}</h6>
                    <div className="mb-3">
                      <label htmlFor={`nome-${index}`} className="form-label form-label-sm">
                        Nome (Variável)
                      </label>
                      <input
                        id={`nome-${index}`}
                        name={`nome-${index}`}
                        onChange={onChangeEntradas}
                        type="text"
                        className="form-control form-control-sm"
                        defaultValue={entrada.nome}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`displayNome-${index}`} className="form-label form-label-sm">
                        Nome para Display
                      </label>
                      <input
                        id={`displayNome-${index}`}
                        name={`displayNome-${index}`}
                        onChange={onChangeEntradas}
                        type="text"
                        className="form-control form-control-sm"
                        defaultValue={entrada.displayNome}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`inputType-${index}`} className="form-label form-label-sm">
                        Tipo de Input
                      </label>
                      <select
                        id={`inputType-${index}`}
                        name={`inputType-${index}`}
                        onChange={onChangeEntradas}
                        className="form-select form-select-sm"
                        defaultValue={entrada.inputType}
                      >
                        <option value="input">Input</option>
                        <option value="select">Select</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`obs-${index}`} className="form-label form-label-sm">
                        Observação
                      </label>
                      <input
                        id={`obs-${index}`}
                        name={`obs-${index}`}
                        onChange={onChangeEntradas}
                        type="text"
                        className="form-control form-control-sm"
                        defaultValue={entrada.obs}
                      />
                    </div>
                    {/* Campos condicionais para Input */}
                    {entrada.inputType === "input" && (
                      <div className="border-top pt-3 mt-3">
                        <div className="mb-3">
                          <label htmlFor={`tipo-${index}`} className="form-label form-label-sm">
                            Tipo de Entrada (HTML)
                          </label>
                          <input
                            id={`tipo-${index}`}
                            name={`tipo-${index}`}
                            onChange={onChangeEntradas}
                            type="text"
                            className="form-control form-control-sm"
                            defaultValue={entrada.tipo}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor={`unidade-${index}`} className="form-label form-label-sm">
                            Unidade
                          </label>
                          <input
                            id={`unidade-${index}`}
                            name={`unidade-${index}`}
                            onChange={onChangeEntradas}
                            type="text"
                            className="form-control form-control-sm"
                            defaultValue={entrada.unidade}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor={`placeholder-${index}`}
                            className="form-label form-label-sm"
                          >
                            Placeholder
                          </label>
                          <input
                            id={`placeholder-${index}`}
                            name={`placeholder-${index}`}
                            onChange={onChangeEntradas}
                            type="text"
                            className="form-control form-control-sm"
                            defaultValue={entrada.placeholder}
                          />
                        </div>
                      </div>
                    )}
                    {/* Campos condicionais para Select */}
                    {entrada.inputType === "select" && (
                      <div className="border-top pt-3 mt-3">
                        <h6 className="mb-3">Opções do Select</h6>
                        {entrada.entradas.map((subentrada, subIndex) => (
                          <div
                            key={subentrada.nome || subIndex}
                            className="border p-2 mb-2 rounded bg-light"
                          >
                            <div className="row g-2">
                              <div className="col-6">
                                <label
                                  htmlFor={`tipo-${index}-${subIndex}`}
                                  className="form-label form-label-sm"
                                >
                                  Tipo
                                </label>
                                <input
                                  id={`tipo-${index}-${subIndex}`}
                                  name={`tipo-${index}-${subIndex}`}
                                  onChange={onChangeEntradas}
                                  className="form-control form-control-sm"
                                  defaultValue={subentrada.tipo}
                                />
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor={`nome-${index}-${subIndex}`}
                                  className="form-label form-label-sm"
                                >
                                  Nome
                                </label>
                                <input
                                  id={`nome-${index}-${subIndex}`}
                                  name={`nome-${index}-${subIndex}`}
                                  onChange={onChangeEntradas}
                                  className="form-control form-control-sm"
                                  defaultValue={subentrada.nome}
                                />
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor={`value-${index}-${subIndex}`}
                                  className="form-label form-label-sm"
                                >
                                  Valor
                                </label>
                                <input
                                  id={`value-${index}-${subIndex}`}
                                  name={`value-${index}-${subIndex}`}
                                  onChange={onChangeEntradas}
                                  className="form-control form-control-sm"
                                  defaultValue={subentrada.value}
                                />
                              </div>
                              <div className="col-6">
                                <input
                                  id={`isDefault-${index}-${subIndex}`}
                                  name={`isDefault-${index}-${subIndex}`}
                                  onChange={onChangeEntradas}
                                  value={true}
                                  type="checkbox"
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor={`default-${index}-${subIndex}`}
                                  className="form-check-label"
                                >
                                  É Padrão?
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Referências */}
        <div className="card mb-4">
          <div className="card-header">Referências</div>
          <div className="card-body">
            {form.referencias.map((referencia, index) => (
              <div key={referencia.titulo || index} className="row g-2 mb-2 align-items-end">
                <div className="col-md-6">
                  <label htmlFor={`ref-titulo-${index}`} className="form-label form-label-sm">
                    Título
                  </label>
                  <input
                    id={`ref-titulo-${index}`}
                    name={`titulo-${index}`}
                    onChange={onChangeReferencias}
                    className="form-control form-control-sm"
                    defaultValue={referencia.titulo}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor={`ref-link-${index}`} className="form-label form-label-sm">
                    Link
                  </label>
                  <input
                    id={`ref-link-${index}`}
                    name={`link-${index}`}
                    onChange={onChangeReferencias}
                    className="form-control form-control-sm"
                    defaultValue={referencia.link}
                  />
                </div>
                {/* Adicionar botão para remover referência se necessário */}
              </div>
            ))}
            {/* Adicionar botão para adicionar nova referência se necessário */}
          </div>
        </div>

        {/* Calculadoras Relacionadas */}
        <div className="card mb-4">
          <div className="card-header">Calculadoras Relacionadas</div>
          <div className="card-body">
            <label htmlFor="calculadorasRelacionadas" className="form-label">
              Selecione Calculadoras Relacionadas
            </label>
            <select
              id="calculadorasRelacionadas"
              multiple
              className="form-select" /* Alterado para form-select */
              value={form.calculadorasRelacionadas}
              onChange={handleSelectRelacionadas}
              name="calculadorasRelacionadas"
              size="5" /* Adicionado size para melhor visualização */
            >
              {todasCalculadoras
                .filter((c) => c.slug !== form.slug)
                .map((calc) => (
                  <option key={calc._id} value={calc._id}>
                    {calc.titulo}
                  </option>
                ))}
            </select>
            <div className="form-text">Segure Ctrl (ou Cmd no Mac) para selecionar múltiplas.</div>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Atualizar Calculadora
        </button>
      </form>
    </div>
  );
}
