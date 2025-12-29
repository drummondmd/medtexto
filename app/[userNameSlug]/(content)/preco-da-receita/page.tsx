"use client";

import { useState } from "react";

import findPriceAndRemuneAction, { ResultType } from "@/actions/price-feature/findPriceRemune";
import ResultadoContainerPrice from "@/components/features/preco-da-receita/resultadoContainer";
import ActionWStatus from "@/components/shared/action-w-status/action-w-status";
import TitleHeader from "@/components/ui/titleHeader";

export default function Page() {
  const [status, setStatus] = useState<{
    statusCode: "success" | "error" | "info";
    statusMessage: string;
  }>({ statusCode: "info", statusMessage: "Digite/cole texto ou receita abaixo" });
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | ResultType>(null);

  const handleClick = async () => {
    setStatus({ statusCode: "info", statusMessage: "Investigando..." });
    const res = await findPriceAndRemuneAction(input);
    if (!res.success) {
      setStatus({ statusCode: "error", statusMessage: res.message ?? "Erro na execução!" });
      setResult(null);
    } else {
      ///a determinar depois
      setResult(res.result);
      setStatus({ statusCode: "success", statusMessage: "Resultado está ao lado!" });
    }
  };

  return (
    <main className="w-full mx-auto px-4 py-6">
      <TitleHeader
        title="Preço da Receita"
        description="Descobrir preço dos medicamentos de uma receita e se estão na lista de remune, dados são obtidos através da lista de medicações da anvisa."
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Input + actions */}
        <section className="md:col-span-6 bg-white/60 dark:bg-slate-900/50 p-4 rounded-lg shadow-sm">
          <div className="flex flex-col gap-3">
            <ActionWStatus
              btnTitle="Investigar"
              variant="yellow"
              onClick={handleClick}
              status={status}
              disableBtn={false}
            />

            <label htmlFor="rec-input" className="sr-only">
              Receita ou texto
            </label>
            <textarea
              id="rec-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="w-full resize-y rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Cole aqui a receita ou descrição da medicação..."
            />

            <p className="text-xs text-gray-500">
              Dica: Escreva as medicações no formato(medicação dosagem posologia tempo de uso sn,
              ex: Losartana 50mg MID) para melhores resultados.
            </p>
          </div>
        </section>

        {/* Right: Result */}
        <aside className="md:col-span-6">
          <div className="sticky top-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ResultadoContainerPrice resultados={result} />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
