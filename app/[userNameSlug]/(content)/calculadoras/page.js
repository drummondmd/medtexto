import CalculadorasGrid from "@/components/calculadoras/calculadoras-grid";
import { getCalculadoras } from "@/lib/databases/handler-mongodb";
import { Suspense } from "react";
import Loading from "../../loading";


export default async function Calculadoras() {

    async function CalculadoraServerPage() {

        const calculadoras = await getCalculadoras();

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