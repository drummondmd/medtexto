"use client";

import { ResultType } from "@/actions/price-feature/findPriceRemune";

export default function ResultadoContainerPrice({ resultados }: { resultados: null | ResultType }) {
  if (!resultados || resultados.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-600">
        Nenhum resultado, preencha um campo válido ao lado.
      </div>
    );
  }

  const normalizedResul = resultados.map((resultado) => {
    return {
      ...resultado,
      priceUnit: Number(resultado.priceUnit) * 0.6,
    };
  });

  const totalPrice = normalizedResul
    .map((res) => res.priceUnit * res.quantidadeNumber)
    .reduce((acc, cur) => acc + cur, 1);

  if (Number.isNaN(totalPrice) || totalPrice === 0) {
    return <div className="p-4 text-sm text-red-600">Erro ao calcular o preço da receita.</div>;
  }

  return (
    <section className="w-full">
      <header className="flex items-center justify-between bg-white/60 px-4 py-3 rounded-md shadow-sm mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Preço total da receita</h3>
        <div className="text-lg font-bold text-emerald-600">R$ {totalPrice.toFixed(2)}</div>
      </header>

      <div className="space-y-3">
        {normalizedResul.map((item, idx) => (
          <article
            key={`${item.med}-${idx}`}
            className="bg-white rounded-lg shadow-sm p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-900 truncate">{item.med}</h4>
              <p className="text-xs text-gray-500 sm:mt-1 truncate">{item.dosagem}</p>
            </div>

            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <div className="text-xs text-gray-600 text-center">
                <div className="font-semibold">Qtd</div>
                <div>{item.quantidade}</div>
              </div>

              <div className="text-xs text-gray-600 text-center">
                <div className="font-semibold">Remune</div>
                <div>{item.temRemune ? "Sim" : "Não"}</div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500">Un.</div>
                <div className="text-sm font-medium text-slate-900">
                  R$ {(Number(item.priceUnit) || 0).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-sm font-semibold text-emerald-600">
                  R$ {((Number(item.priceUnit) || 0) * (item.quantidadeNumber || 0)).toFixed(2)}
                </div>
              </div>
            </div>

            {item.alternatives && item.alternatives.length > 0 && (
              <div className="mt-2 sm:mt-0 w-full sm:w-auto text-xs text-gray-500">
                Alternativas: {item.alternatives.join(", ")}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
