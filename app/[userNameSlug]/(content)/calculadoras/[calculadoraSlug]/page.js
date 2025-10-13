import ConstrutorDeCalculadora from "@/components/calculadoras/construtor-de-calculadora";
import { getCalculadora } from "@/lib/databases/handler-mongodb";
import { notFound } from "next/navigation";


export default async function CalculadoraDetalhe({ params }) {
    const { calculadoraSlug } = await params



       const start = new Date()

    const data  = await getCalculadora(calculadoraSlug)
    // let data = calculadorasEstaticas.find((calc) => calc.slug === calculadoraSlug);
    // let relacionadas = []
    // if (data.calculadorasRelacionadas.length > 0) {
    //     //substituir
    //     data.calculadorasRelacionadas.forEach((relac) => relacionadas.push(calculadorasEstaticas.find((calc) => calc._id['$oid'] === relac['$oid'])))
    // }
    // data.calculadorasRelacionadas = relacionadas

    // console.log(data.calculadorasRelacionadas)
     console.log("calculadoras-slug" , Date.now() - start , "ms")

    if (!data) {
        console.log("Não encontrado")
        notFound()
    }




    return (
        <div className="container">
            <ConstrutorDeCalculadora calc={JSON.stringify(data)} />

        </div>
    )
}