"use client";

import { useState } from "react";

import textToRecFunction from "@/actions/receituarios/text-to-rec-function";
import ActionWStatus from "@/components/shared/action-w-status/action-w-status";
import TextAreaWControlContainer from "@/components/shared/text-area-wControl/text-area-container";

export default function TextoParaReceita() {
  ///mandar e pegar da db depois, talvez nem utilizar

  const [text, setText] = useState("");
  const [rec, setRec] = useState("Resultado aparecerá aqui...");
  const [stauts, setStatus] = useState({
    statusCode: "info",
    statusMessage: "Digite medicações no formato acima...",
  });

  async function handleTextToRec() {
    setStatus({ statusCode: "info", statusMessage: "Transformando..." });
    setRec("...Carregando");
    const response = await textToRecFunction(text, rec);
    if (!response.success) {
      setStatus({ statusCode: "error", statusMessage: response.message });
      setRec("");
    } else {
      setStatus({ statusCode: "success", statusMessage: response.message ?? "Transformado!" });
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
            placeholder="ex:Losartana 50mg MID ; Amoxicilina 500mg TID 7-d; Dipirona 500mg 2cp ( - se estiver em branco = 1 cp) QID SN; Morfina 10mg q_4(a cada 4 horas) "
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <ActionWStatus
          onClick={handleTextToRec}
          status={stauts}
          btnTitle="Transformar"
          variant="yellow"
          disableBtn={text.length === 0}
        />

        {/* {error ?? <div>{error}</div>}
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
                setText("");
                setRec("");
              }}
            >
              Apagar
            </button>
          </div>
        </div> */}

        <div className="my-2">
          <TextAreaWControlContainer
            key={rec}
            canMutateData={false}
            canOCR={false}
            initialState={rec}
            apiUpdateFunction={undefined}
            userId={undefined}
            variant="small"
          />
        </div>
      </div>
    </>
  );
}
