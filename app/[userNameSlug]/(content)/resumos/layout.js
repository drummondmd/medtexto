import { getUser } from "@/lib/databases/handler-pgdb";
import MenuResumo from "@/components/resumos/menu-resumo";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { mongo } from "mongoose";

export default async function ResumosLayout({ children, params }) {
    const { userNameSlug } = await params;
    const  userDetail = await getUser(userNameSlug);
    const mongoDb = await getUserMongo(userDetail);
    const resumos = JSON.stringify(mongoDb.resumos)



    return (
        <div className="container">
            <h6 className="display-6">Resumos</h6>
            <div className="row">
                <div className="col-md-3">
                <MenuResumo cadernosJson={resumos} userNameSlug={userNameSlug} userDetail={userDetail} />
                </div>
                <div className="col-md-9">
                {children}
                </div>


            </div>
        </div>


    )



}