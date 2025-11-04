"use client";

import { ClipboardCheck } from "lucide-react";
import { useState } from "react";

import recToTexFunction from "@/actions/receituarios/rec-to-text-function";

export default function ReceitaParaTexto() {
  const [receita, setReceita] = useState<string>("");
  const [texto, setTexto] = useState<string>("");
  const [erro, setErro] = useState<null | string>(null);
  const [copiado, setCopiado] = useState<boolean>(false);

  async function handleTransform() {
    setErro(null);
    const response = await recToTexFunction(receita);
    if (response.success) {
      setTexto(response.output);
    } else {
      setErro(response.message);
    }
  }

  const handleCopia = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <div className="container">
      <div className="my-2">
        <div className="d-inline">
          <button
            onClick={handleTransform}
            type="button"
            className="btn btn-outline-secondary mx-1"
          >
            Transformar
          </button>
          <button
            onClick={() => {
              (setReceita(""), setTexto(""));
            }}
            type="button"
            className="btn btn-outline-danger mx-1"
          >
            Apagar
          </button>
          {copiado && (
            <span className="text-green-400">
              Copiado!
              <ClipboardCheck size={"18px"} color="oklch(72.3% 0.219 149.579)" />
            </span>
          )}
        </div>
      </div>
      {texto != "" && (
        <div className="my-3">
          <textarea
            title="clique para copiar"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onClick={handleCopia}
            className="form-control"
            placeholder={"Resultado ficará aqui,clique para copiar. "}
          />
        </div>
      )}

      {erro && <span className="text-danger p-1">{erro}</span>}
      <div className="my-3">
        <textarea
          value={receita}
          onChange={(e) => setReceita(e.target.value)}
          placeholder={`Copie receita aqui. \nex:1)Losartana 50mg ----------------- 30 comprimidos/mês.\nTomar 1 comprimido ao dia.`}
          style={{ height: "260px" }}
          className="form-control"
        />
      </div>
    </div>
  );
}
