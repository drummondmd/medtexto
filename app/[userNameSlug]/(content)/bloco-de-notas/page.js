import BlocoDeNotas from "@/components/bloco-de-notas/bloco-de-notas"
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb"
import { notFound } from "next/navigation";

export default async function BlocoDeNotaPage({ params }) {
    const start = new Date()

    ///geral
    const { userNameSlug } = await params;

    const user = await getUser(userNameSlug);
    if (!user) {
        notFound()
    }

    // const [userProfile, userMongo] = await Promise.all([
    //     getUserProfile(user.id),
    //     getUserMongo(user.id),
    // ]);

    const userProfile = await getUserProfile(user.id)
    const userMongo = await getUserMongo(user.id);

    if (!userProfile || !userMongo) {
        notFound()
    }

    console.log(" bloco timing:", Date.now() - start, "ms");



    ////especifico.
    const blocosDeNotas = userMongo.blocosDeNotas
    return <BlocoDeNotas user={userProfile} inputDb={{ conteudo: blocosDeNotas }} />

}