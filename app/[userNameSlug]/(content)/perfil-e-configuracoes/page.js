
import ConfiguracoesGrid from "@/components/configuracoes/configuracoes-grid";
import { getUser } from "@/lib/databases/handler-pgdb";

export default async function Preferencias({ params }) {
    const { userNameSlug } = await params
    const userDetail = await getUser(userNameSlug)

    return <ConfiguracoesGrid userNameSlug={userNameSlug} userDetail={userDetail} />

}