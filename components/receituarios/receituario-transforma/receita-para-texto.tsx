"use client";

import { useState } from "react";

import recToTexFunction from "@/actions/receituarios/rec-to-text-function";
import ActionWStatus from "@/components/shared/action-w-status/action-w-status";
import TextAreaWControlContainer from "@/components/shared/text-area-wControl/text-area-container";

export default function ReceitaParaTexto() {
  const defaultStatus = {
    statusCode: "info",
    statusMessage: "Digite ou cole receita abaixo",
  } as const;

  type StatusCode = "info" | "success" | "error";

  const [receita, setReceita] = useState<string>("");
  const [texto, setTexto] = useState<string>("Resultado aparecerá aqui...");
  const [status, setStatus] = useState<{ statusCode: StatusCode; statusMessage: string }>(
    defaultStatus
  );

  async function handleTransform() {
    setStatus({ statusCode: "info", statusMessage: "Transformando.." });
    const response = await recToTexFunction(receita);
    if (response.success) {
      setTexto(response.output);
      setStatus({ statusCode: "success", statusMessage: "Transformado.." });
      setTimeout(() => setStatus(defaultStatus), 2000);
    } else {
      setStatus({ statusCode: "error", statusMessage: response.message });
      setTimeout(() => setStatus(defaultStatus), 2000);
    }
  }
  return (
    <div className="container">
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/2 m-2">
          <ActionWStatus
            btnTitle="Transformar"
            disableBtn={receita.length === 0}
            onClick={handleTransform}
            status={status}
            variant="yellow"
          />
          <div>
            <textarea
              value={receita}
              onChange={(e) => setReceita(e.target.value)}
              placeholder={`Copie receita aqui. \nex:1)Losartana 50mg ----------------- 30 comprimidos/mês.\nTomar 1 comprimido ao dia.`}
              style={{ height: "260px" }}
              className="form-control"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 m-2">
          <TextAreaWControlContainer
            canMutateData={false}
            canOCR={false}
            initialState={texto}
            resource="transform"
            variant="small"
            apiUpdateFunction={null}
            userId={null}
            key={texto}
          />
          {/* <textarea
            title="clique para copiar"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onClick={handleCopia}
            className="form-control"
            placeholder={"Resultado ficará aqui,clique para copiar. "}
          /> */}
        </div>
      </div>
    </div>
  );
}
