import CalculadorasGrid from "@/components/calculadoras/calculadoras-grid";
import { getCalculadoras } from "@/lib/databases/handler-mongodb";
import { Suspense } from "react";
import Loading from "../../loading";


export default async function Calculadoras() {

    async function CalculadoraServerPage() {
        // const start = new Date()
        const calculadoras = await getCalculadoras();

        // console.log("calculadoras" , Date.now() - start , "ms")

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