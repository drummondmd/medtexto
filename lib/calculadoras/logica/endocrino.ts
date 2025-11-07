export function calcularConversaoCorticoide({
  corticoideOrigem,
  doseOrigem,
  corticoideDestino,
}: {
  corticoideOrigem: string | number;
  doseOrigem: string;
  corticoideDestino: string | number;
}) {
  const conversionRate = +corticoideDestino / +corticoideOrigem;
  const result = +doseOrigem * conversionRate;

  return { "Dose convertida": `${Number.isInteger(result) ? result : result.toFixed(1)} mg.` };
}
