import CalculadorasGrid from "@/components/calculadoras/calculadoras-grid";
import { estruturaCalculadoras } from "@/lib/calculadoras/calc-estrutura";

export default async function Calculadoras() {
  const calculadoras = estruturaCalculadoras;

  return <CalculadorasGrid data={JSON.stringify(calculadoras)} />;
}
