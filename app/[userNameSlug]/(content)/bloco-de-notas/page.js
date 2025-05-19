import BlocoDeNotas from "@/components/bloco-de-notas/bloco-de-notas"
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser } from "@/lib/databases/handler-pgdb"
import { mongo } from "mongoose";

export default async function BlocoDeNotaPage({ params }) {
    const { userNameSlug } = await params
    const userDetail = await getUser(userNameSlug);
    const mongoDb = await getUserMongo(userDetail);
    let blocosDeNotas = mongoDb.blocosDeNotas;

    ///colocando valor se mongoDB vazio
    if (mongoDb == null) {
        blocosDeNotas = ""
    }



    return <BlocoDeNotas user={userDetail} inputDb={{ conteudo: blocosDeNotas }} />

}