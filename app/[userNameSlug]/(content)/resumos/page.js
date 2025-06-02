
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";
import NotasResumos from "@/components/resumos/notas";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { notFound } from "next/navigation";


export default async function TodosOsCadernos({ params }) {
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
    const resumos = userMongo.resumos
    let notas = []
    if (resumos.length > 0) {
        resumos.forEach(caderno => {
            let cadernoId = caderno["_id"];
            caderno.notas.forEach((nota) => {
                notas.push({ ...nota, cadernoId: cadernoId })
            })

        });
    }

    ///depois colocar somente algumas notas  e não todas

    return (<>
        <div className="row" >
            {notas.map((elem) => <NotasResumos key={elem["_id"]} notaId={elem["_id"]} titulo={elem.titulo} conteudo={elem.conteudo} userNameSlug={userNameSlug} cadernoId={elem.cadernoId} />)}
        </div>

    </>)

}