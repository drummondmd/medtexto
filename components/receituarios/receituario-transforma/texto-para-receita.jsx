"use client";

import { useState } from "react";

import textToRecFunction from "@/actions/receituarios/text-to-rec-function";

export default function TextoParaReceita() {
  ///mandar e pegar da db depois, talvez nem utilizar

  const [text, setText] = useState("");
  const [rec, setRec] = useState("");
  const [error, setError] = useState(null);

  async function handleTextToRec() {
    setError(null);
    setRec("...Carregando");
    const response = await textToRecFunction(text, rec);
    if (!response.success) {
      setError(response.message);
    } else {
      setRec(response.output);
    }
  }

  return (
    <>
      <div className="container">
        <h6 className="my-2">Transformação de receituário</h6>
        <div className="my-2">
          <textarea
            className="form-control"
            placeholder="ex:Losartana 50mg MID ; Amoxicilina 500mg MID 7d "
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        {error ?? <div>{error}</div>}
        <div className="my-2">
          <span className="border-end pe-2 me-2">Texto para receita</span>
          <div className="d-inline">
            <button type="button" className="btn btn-outline-dark mx-1" onClick={handleTextToRec}>
              Transformar
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary mx-1"
              onClick={() => {
                navigator.clipboard.writeText(rec);
              }}
            >
              Copiar
            </button>
            <button
              type="button"
              className="btn btn-danger mx-1"
              onClick={() => {
                setArray([]);
                setRec("");
              }}
            >
              Apagar
            </button>
          </div>
        </div>

        <div className="my-2">
          <textarea
            placeholder={`ex:1)Losartana 50mg ----------------- 30 comprimidos/mês.\nTomar 1 comprimido ao dia.
`}
            value={rec}
            onChange={(e) => setRec(e.target.value)}
            style={{ height: "340px" }}
            className="form-control"
          ></textarea>{" "}
        </div>
      </div>
    </>
  );
}
