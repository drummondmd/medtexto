import ReceituarioTransforma from "@/components/receituarios/receituario-transforma/receituario-transforma";
import { getUser } from "@/lib/databases/handler-pgdb";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import ReceituarioGrid from "@/components/receituarios/receituario-grid";


export default async function Receituarios({ params }) {
    const { userNameSlug } = await params
    const userDetail = await getUser(userNameSlug);
    const mongoDb = await getUserMongo(userDetail);
    ///valores vazios iniciais se não pegar nada do db
    let {receituarios,receituarioTransforma} = {receituarios:[],receituarioTransforma:{}}

    ///checar se existe dado para usuario e atribuir valor do db
    if (mongoDb.receituarios) {
        receituarios = mongoDb.receituarios.map((elem) => {
            return (
                {
                    titulo: elem.titulo,
                    conteudo: elem.conteudo,
                    _id: JSON.stringify(elem["_id"])
                }

            )


        }
        )
    }
    if (mongoDb.receituarioTransforma) {
        receituarioTransforma = await mongoDb.receituarioTransforma
        ///mongo gera um Ojeto mongo, ao inves de um objeto normal., por isso necessario desestruturar abaixo
        receituarioTransforma = {
            input: receituarioTransforma.input,
            output: receituarioTransforma.output
        }
    }


    return (
        <>
            <div className="container my-2">
                <h6 className="display-6">Receituarios</h6>
                <div className="row">
                    <div className="col-lg-6">
                        <ReceituarioGrid user={userDetail} data={receituarios} />
                    </div>
                    <div className="col-lg-6">
                        <ReceituarioTransforma user={userDetail} data={receituarioTransforma} />

                    </div>


                </div>



            </div>

        </>

    )
}