import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import EvolucoesGrid from "@/components/evolucoes/evolucoes-grid";

export default async function Evolucoes({ params }) {
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

    const evolucoes = JSON.stringify(userMongo.evolucoes);

    return (
        <>
            <div className="container my-2">
                <h6 className="display-6">Evoluções</h6>
                <EvolucoesGrid user={userProfile} data={evolucoes} />

            </div>
        </>)

}