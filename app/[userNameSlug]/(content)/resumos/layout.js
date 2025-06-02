import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";
import MenuResumo from "@/components/resumos/menu-resumo";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { notFound } from "next/navigation";

export default async function ResumosLayout({ children, params }) {
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
    const resumos = JSON.stringify(userMongo.resumos)



    return (
        <div className="container">
            <h6 className="display-6">Resumos</h6>
            <div className="row">
                <div className="col-md-3">
                <MenuResumo cadernosJson={resumos} userNameSlug={userNameSlug} userDetail={userProfile} />
                </div>
                <div className="col-md-9">
                {children}
                </div>


            </div>
        </div>


    )



}