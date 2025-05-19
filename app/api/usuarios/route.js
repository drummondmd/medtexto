import { getUser } from "@/lib/databases/handler-pgdb"

export async function GET(request) {
    const query = request.nextUrl.searchParams.get("query")
    ///checar se válido
    const reservados = ["admin", "blog", "embaixadores",""].find((elem) => elem === query);
    const regEx = new RegExp(/^\S*$/g).test(query);

    if(reservados||!regEx||query.trim()===""){ return Response.json(true) }

    ///checar se já existente, se existir responder que já existe e não autorizar cadastro;
    const alreadyHaveUser = await getUser(query)

    if (alreadyHaveUser) {
        return Response.json(true)
    } else {
        return Response.json(false)
    }

}