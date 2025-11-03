"use client";

import { ClipboardCheck } from "lucide-react";
import { useState } from "react";

import recToTexFunction from "@/actions/receituarios/rec-to-text-function";

export default function ReceitaParaTexto() {
  const [receita, setReceita] = useState<undefined | string>(undefined);
  const [texto, setTexto] = useState<undefined | string>(undefined);
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
        <span className="border-end pe-2 me-2 font-weight-bold">Receita para texto</span>
        <div className="d-inline">
          <button onClick={handleTransform} type="button" className="btn btn-secondary mx-1">
            Transformar
          </button>
          <button type="button" className="btn btn-secondary mx-1">
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
      <div className="my-2">
        <textarea
          title="clique para copiar"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onClick={handleCopia}
          className="form-control"
          placeholder={"Resultado ficará aqui,clique para copiar. "}
        />
      </div>
      {erro && <span className="text-danger p-1">{erro}</span>}
      <div className="my-2">
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
