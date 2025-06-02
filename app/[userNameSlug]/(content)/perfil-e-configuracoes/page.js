
import ConfiguracoesGrid from "@/components/configuracoes/configuracoes-grid";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";
import { notFound } from "next/navigation";

export default async function Preferencias({ params }) {
    ///geral
    const { userNameSlug } = await params;

    const user = await getUser(userNameSlug);
    if (!user) {
        notFound()
    }

    const userProfile = await getUserProfile(user.id)
    const userMongo = await getUserMongo(user.id);
    if (!userProfile||!userMongo) {
        notFound()
    }

    ///especifico

    const isSenhaDefinida = user.senha_hash ? true:false

    return <ConfiguracoesGrid isSenhaDefinida={isSenhaDefinida} userNameSlug={userNameSlug} userDetail={userProfile} />

}