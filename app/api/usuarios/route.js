//import { pool } from "./db-config.js";
import { pool } from "../../../lib/databases/db-config.js";

const checkUser = async (userName) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [userName]);
    if (result.rowCount === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  } catch (error) {
    console.error(error);
    throw new Error("Erro na obtenção dos usuarios da database");
  }
};

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
  const alreadyHaveUser = await checkUser(query);

  if (!alreadyHaveUser) {
    return Response.json({ response: true });
  } else {
    return Response.json({ response: false, mensagem: "Usuário já registrado" });
  }
}
