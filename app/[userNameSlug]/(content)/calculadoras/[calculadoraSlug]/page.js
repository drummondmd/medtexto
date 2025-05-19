import ConstrutorDeCalculadora from "@/components/calculadoras/construtor-de-calculadora";
import { calculadoraEspecifica } from "@/lib/databases/calculadora-handler";
import { getCalculadora } from "@/lib/databases/handler-mongodb";
import { notFound } from "next/navigation";


export default async function CalculadoraDetalhe({ params }) {
    const { calculadoraSlug } = await params
    const data = await getCalculadora(calculadoraSlug)
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