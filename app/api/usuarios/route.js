import { getUser } from "@/lib/databases/handler-pgdb";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  ///checar se válido
  const reservados = ["admin", "blog", "embaixadores", " "].find((elem) => elem === query);
  const regEx = new RegExp(/^\S*$/g).test(query);

  if (reservados || !regEx || query.trim() === "") {
    return Response.json({
      response: false,
      mensagem:
        "Nome de usuario ou caracteres não permitidos (usuarios só podem conter letras, números, underscore e pontos.)",
    });
  }

  ///checar se já existente, se existir responder que já existe e não autorizar cadastro;
  const alreadyHaveUser = await getUser(query);

  if (!alreadyHaveUser) {
    return Response.json({ response: true });
  } else {
    return Response.json({ response: false, mensagem: "Usuário já registrado" });
  }
}
