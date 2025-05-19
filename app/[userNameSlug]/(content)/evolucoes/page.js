import { getUser } from "@/lib/databases/handler-pgdb";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import EvolucoesGrid from "@/components/evolucoes/evolucoes-grid";

export default async function Evolucoes({ params }) {
    const { userNameSlug } = await params
    const userDetail = await getUser(userNameSlug);
    const mongoDb = await getUserMongo(userDetail);
    ///map para stringfy o objectid, não sei se dará certo depois
    const evolucoes = mongoDb.evolucoes.map((elem) => {
        return (
            {
                titulo: elem.titulo,
                conteudo: elem.conteudo,
                _id: JSON.stringify(elem["_id"])
            }

        )


    }
    )
    return (
        <>
            <div className="container my-2">
                <h6 className="display-6">Evoluções</h6>
                <EvolucoesGrid user={userDetail} data={evolucoes} />

            </div>
        </>)

}