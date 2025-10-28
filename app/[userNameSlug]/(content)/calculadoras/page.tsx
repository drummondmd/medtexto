import CalculadorasGrid from "@/components/calculadoras/calculadoras-grid";
import { Suspense } from "react";
import Loading from "../../loading";
import { estruturaCalculadoras } from "@/lib/calculadoras/calc-estrutura";


export default async function Calculadoras() {
    const calculadoras = estruturaCalculadoras;

    async function CalculadoraServerPage() {

        return <CalculadorasGrid data={JSON.stringify(calculadoras)} />

    }

    return (
        <div className="container">
            <Suspense fallback={<Loading />}>
                <CalculadoraServerPage />
            </Suspense>
        </div>

    )
}