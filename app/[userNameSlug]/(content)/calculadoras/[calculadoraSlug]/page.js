import Loading from "@/app/[userNameSlug]/loading";
import ConstrutorDeCalculadora from "@/components/calculadoras/construtor-de-calculadora";
import { calculadoraEspecifica } from "@/lib/databases/calculadora-handler";
import { getCalculadora } from "@/lib/databases/handler-mongodb";
import { notFound } from "next/navigation";
import { Suspense } from "react";


export default async function CalculadoraDetalhe({ params }) {
    const { calculadoraSlug } = await params


    async function CalculadoraDoServidor() {
        const data = await getCalculadora(calculadoraSlug)
        if (!data) {
            console.log("Não encontrado")
            notFound()
        }
        return <ConstrutorDeCalculadora calc={JSON.stringify(data)} />
    }



    return (
        <div className="container">
            <Suspense fallback={<Loading />}>
                <CalculadoraDoServidor />
            </Suspense>

        </div>
    )
}