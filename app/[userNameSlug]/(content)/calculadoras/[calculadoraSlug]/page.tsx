import { notFound } from "next/navigation";

import ConstrutorDeCalculadora from "@/components/calculadoras/construtor-de-calculadora";
import { estruturaCalculadoras } from "@/lib/calculadoras/calc-estrutura";
import { CalculadoraEstrutura } from "@/lib/calculadoras/estrutura/calcType";

export default async function CalculadoraDetalhe({ params }) {
  const { calculadoraSlug } = await params;

  const calcData = estruturaCalculadoras.find((elem) => elem.slug === calculadoraSlug);

  if (!calcData) {
    console.error("Não encontrado");
    notFound();
  }

  if (calcData.calculadorasRelacionadas) {
    const populetedArray: CalculadoraEstrutura[] = [];
    calcData.calculadorasRelacionadas.forEach((relacionada) => {
      const populetedCalc = estruturaCalculadoras.find((elem) => elem.id === relacionada.id);
      if (populetedCalc) populetedArray.push(populetedCalc);
    });

    calcData.calculadorasRelacionadas = populetedArray;
  }

  return (
    <div className="container">
      <ConstrutorDeCalculadora calc={calcData} />
    </div>
  );
}
