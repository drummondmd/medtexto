"use server";

import crypto from "node:crypto";

import { redirect } from "next/navigation";

import { pool } from "@/lib/databases/db-config";
import getTokenFromDb from "@/lib/databases/handle-token-pg";
import { getUser } from "@/lib/databases/handler-pgdb";
import { hashPassword } from "@/lib/hash/hash";
import { transporter } from "@/lib/nodemailer/config.js";

export async function resetPassAction(prev, formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const userId = formData.get("userId");

  const emailCadastrado = (await getUser(username)).email;

  if (emailCadastrado != email) {
    return {
      erro: "Email diferente do cadastrado,verifique digitação",
      payload: formData,
    };
  }

  ///gerando token aleatorio
  const tokenBuf = crypto.randomBytes(128);
  const token = tokenBuf.toString("hex");

  ///mandar token por email

  const url = "https://medtexto.vercel.app";

  const resetLink = `${url}/${username}/auth/reset-password/new-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: '"MedTexto" <angelindigital@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Redefinição de Senha Solicitada", // Subject line
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Olá ${username || ""},</h2>
        <p>Você solicitou a redefinição da sua senha para o MedTexto.</p>
        <p>Por favor, clique no link abaixo para criar uma nova senha:</p>
        <p style="text-align: center;">
          <a href="${resetLink}"
             style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;"
          >Redefinir Senha</a>
        </p>
        <p>Se você não solicitou esta redefinição, por favor ignore este e-mail. Sua senha atual permanecerá a mesma.</p>
        <p>Este link é válido por 6 horas.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
        <p style="font-size: 0.9em; color: #777;">
          Atenciosamente,<br/>
          Equipe MedTexto.
        </p>
      </div>
    `,
      text:
        "Você solicitou a redefinição da sua senha para o MedTexto.Por favor, clique no link abaixo para criar uma nova senha:" +
        resetLink, // plain text body
    });
  } catch (err) {
    console.error("Error while sending mail", err);
    return {
      erro: "Error while sending mail",
      payload: formData,
    };
  }

  ///resetar senha da database e colocar token
  try {
    const now = new Date();
    const expiracao_token = now;
    expiracao_token.setHours(now.getHours() + 6);

    //           INSERT INTO USUARIOS (username,senha_desejada,nome,sobrenome,email,senha_hash,data_criacao)
    //   VALUES($1,$2,$3,$4,$5,$6,$7)
    //   RETURNING id`

    const result = await pool.query(
      `
            INSERT INTO user_tokens (user_id,tipo_token,token,expiracao_token,data_criacao)
            VALUES ($1,$2,$3,$4,$5)
            `,
      [userId, "reset_senha", token, expiracao_token, now]
    );

    if (result.rowCount > 0) {
      ///se criar token corretamente apagar senha atual
      pool.query("UPDATE users SET senha_hash =$1", [null]);
    }
  } catch (error) {
    console.error(error, "erro ao atulizar database");
    return {
      payload: formData,
      erro: "Erro ao atualizar senha",
    };
  }

  return {
    status: "Link enviado, verifique caixa de entrada",
    payload: formData,
  };
}

export async function newPasswordAction(prev, formData) {
  const username = formData.get("username");
  const token = formData.get("token");
  const password = formData.get("password");
  const passwordConfirmation = formData.get("passwordConfirmation");

  ///checar se senha confirma e atende requisito
  if (password != passwordConfirmation || password.length < 6) {
    return {
      erro: "Senha não confere, tente novamente",
    };
  }

  const user = await getUser(username);
  const dbToken = await getTokenFromDb(token);

  ///checar se usuario existe e retorar se não existir
  if (!user) {
    return {
      erro: "Usuario não encontrado",
    };
  }

  ///checar se token é válido
  const now = new Date();

  if (!dbToken || dbToken.user_id != user.id || now > dbToken.expiracao_token) {
    return {
      erro: "Token invalido ou token expirado, solicite nova senha",
      link: `/${username}/auth/reset-password`,
    };
  }

  /// fazer o hash e mandar para database

  const hash = await hashPassword(password);

  try {
    const result = await pool.query("UPDATE users SET senha_hash = $1 WHERE id = $2", [
      hash,
      user.id,
    ]);
    if (result.rowCount > 0) {
      ///apagar token se senha inserida com sucesso
      pool.query("DELETE FROM user_tokens WHERE token =$1", [token]);
    }
  } catch (error) {
    console.error(error);
    return {
      erro: "Erro ao atualizar senha da database",
    };
  }

  ///redirecionar para pagina principal
  // return{
  //     erro:"Sucesso"
  // }

  redirect(`/${username}`);
}
