import CalculadorasGrid from "@/components/calculadoras/calculadoras-grid";
import { Suspense } from "react";
import Loading from "../../loading";
import { calculadorasEstaticas } from "@/lib/calculadoras/calc-static";


export default async function Calculadoras() {

    async function CalculadoraServerPage() {
        const start = new Date()


        // const calculadoras = await getCalculadoras();
        // const staticCalc  = calculadoras.map((calc)=>{
        //     return {titulo:calc.titulo,slug:calc.slug,descricao:calc.descricao}
        // }

        // )
        // console.log(staticCalc)
        const calculadoras = calculadorasEstaticas

        ///tentando buscar calculadora de forma estatica para melhorar perfomance
        // const calculadoras = calculadorasEstaticas

        console.log("calculadoras" , Date.now() - start , "ms")

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