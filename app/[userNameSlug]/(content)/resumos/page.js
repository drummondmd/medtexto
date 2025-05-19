
import { getUser } from "@/lib/databases/handler-pgdb";
import NotasResumos from "@/components/resumos/notas";
import { getUserMongo } from "@/lib/databases/handler-mongodb";


export default async function TodosOsCadernos({ params }) {
    const { userNameSlug } = await params;
    const userDetail = await getUser(userNameSlug)
    const mongoDb = await getUserMongo(userDetail);
    const resumos = mongoDb.resumos

    let notas =[]
    if(resumos.length>0){
        resumos.forEach(caderno => {
            let cadernoId = caderno["_id"];
            caderno.notas.forEach((nota)=>{
                notas.push({...nota,cadernoId:cadernoId})
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