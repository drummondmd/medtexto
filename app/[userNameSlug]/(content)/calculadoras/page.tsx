import { Suspense } from "react";

import CalculadorasGrid from "@/components/calculadoras/calculadoras-grid";
import { estruturaCalculadoras } from "@/lib/calculadoras/calc-estrutura";

import Loading from "../../loading";

export default async function Calculadoras() {
  const calculadoras = estruturaCalculadoras;

  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <CalculadorasGrid data={JSON.stringify(calculadoras)} />
      </Suspense>
    </div>
  );
}
