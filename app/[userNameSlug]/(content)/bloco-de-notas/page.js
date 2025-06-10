import BlocoDeNotas from "@/components/bloco-de-notas/bloco-de-notas"
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb"

export default async function BlocoDeNotaPage({ params }) {
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


    ////especifico.
    const blocosDeNotas = userMongo.blocosDeNotas
    return <BlocoDeNotas user={userProfile} inputDb={{ conteudo: blocosDeNotas }} />

}