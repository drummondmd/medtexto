import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import ReceituarioGrid from "@/components/receituarios/receituario-grid";
import { notFound } from "next/navigation";
import RecTrasformaGrid from "@/components/receituarios/receituario-transforma/receituario-transforma-grid";


export default async function Receituarios({ params }) {
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
    const receituarios =  JSON.stringify(userMongo.receituarios)
    const receituarioTransforma = JSON.stringify(userMongo.receituarioTransforma)





    return (
        <>
            <div className="my-2">
                <h6 className="display-6">Receituários</h6>
                <div className="row">
                    <div className="col-lg-6">
                        <ReceituarioGrid user={userProfile} data={receituarios} />
                    </div>
                    <div className="col-lg-6">
                        <RecTrasformaGrid />
                    </div>


                </div>



            </div>

        </>

    )
}