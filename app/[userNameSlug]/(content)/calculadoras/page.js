import CalculadorasGrid from "@/components/calculadoras/calculadoras-grid";
import { todasCalculadoras } from "@/lib/databases/calculadora-handler";
import { getCalculadoras, getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser } from "@/lib/databases/handler-pgdb";


export default async function Calculadoras({ params }) {
    ///user
    const { userNameSlug } = await params
    const userDetail = await getUser(userNameSlug);
    //calculadoras
    const calculadoras = await getCalculadoras();
    //ainda não busco os favoritos no mongo.
    // const mongoDb = await getUserMongo(userDetail);






    return (
        <div className="container">
            <CalculadorasGrid data={JSON.stringify(calculadoras)} />

        </div>

    )
}