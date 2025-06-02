import NotaDetalhe from "@/components/resumos/nota-detalhe";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";
import { notFound } from "next/navigation";

export default async function PaginaDeNota({ params }) {
    ///geral
    const { userNameSlug } = await params;

    const user = await getUser(userNameSlug);
    if (!user) {
        notFound()
    }

    const userProfile = await getUserProfile(user.id)
    const userMongo = await getUserMongo(user.id);
    if (!userProfile || !userMongo) {
        notFound()
    }

    ///especifico
    const { cadernoSlug } = await params;
    const resumos = userMongo.resumos
    const cadernoEspecifico = resumos.find((elem) => elem["_id"] == cadernoSlug);

    if (!cadernoEspecifico) {
        notFound()
    }

    ///subespecifico.
    const { notasSlug } = await params;
    let notas = cadernoEspecifico.notas
    let notaEscolhidaArray = notas.filter((nota) => nota["_id"] == notasSlug)
    if (notaEscolhidaArray.length === 0) {
        notFound()
    }
    let notaEscolhida = notaEscolhidaArray[0]


    return (
        <>

            <NotaDetalhe data={JSON.stringify(notaEscolhida)} cadernoId={cadernoSlug} user={userProfile} userNameSlug={userNameSlug} />
        </>

    )

}