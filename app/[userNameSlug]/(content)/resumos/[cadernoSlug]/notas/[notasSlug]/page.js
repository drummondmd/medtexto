import NotaDetalhe from "@/components/resumos/nota-detalhe";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser } from "@/lib/databases/handler-pgdb";
import { notFound } from "next/navigation";

export default async function PaginaDeNota({ params }) {
    const { userNameSlug } = await params;
    const { cadernoSlug } = await params;
    const { notasSlug } = await params;
    const userDetail = await getUser(userNameSlug);
    const mongoDb = await getUserMongo(userDetail);
    const resumos = mongoDb.resumos

    const cadernoEspecifico = resumos.find((elem)=>elem["_id"] == cadernoSlug);

    if (!cadernoEspecifico) {
        notFound()
    }
    let notas = cadernoEspecifico.notas
    let notaEscolhidaArray  = notas.filter((nota) =>nota["_id"] == notasSlug )
    if(notaEscolhidaArray.length === 0){
        notFound()
    }
    let notaEscolhida =notaEscolhidaArray[0]


    return (
        <>

                <NotaDetalhe data={JSON.stringify(notaEscolhida)} cadernoId={cadernoSlug} user={userDetail} />
        </>

    )

}