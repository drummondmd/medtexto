"use server";

import { redirect } from "next/navigation";

import { pool } from "@/lib/databases/db-config";

export default async function contactForm(formData) {
  ///função simples, sem checar erros direito e sem voltar para usuario, só redirecionando se tudo der certo

  function isInvalid(text) {
    return !text || text.trim() === "";
  }

  const user = formData.get("user");
  const email = formData.get("email");
  const motivo = formData.get("motivo");
  const mensagem = formData.get("mensagem");
  const emailResponse = formData.get("emailResponse") == "sim" ? true : false;

  if (
    isInvalid(user) ||
    isInvalid(email) ||
    isInvalid(email) ||
    isInvalid(motivo) ||
    isInvalid(mensagem)
  ) {
    console.error("informação errada do usuário");
    return { erro: "Insira os dados corretamentes ou tente novamente mais tarde" };
  }

  try {
    await pool.query(
      `INSERT INTO contatos (user_name,email,motivo,mensagem,email_response)
            VALUES($1,$2,$3,$4,$5)`,
      [user, email, motivo, mensagem, emailResponse]
    );
  } catch (error) {
    console.error("erro ao processar inserção em database", error);
  }

  redirect(`/${user}`);
}
