'use server'

import { pool } from "@/lib/databases/db-config";
import { getUser } from "@/lib/databases/handler-pgdb";
import crypto from "node:crypto"
import { transporter } from "@/lib/nodemailer/config.js"
import nodemailer from 'nodemailer';
import { hashPassword } from "@/lib/hash/hash";
import { redirect } from "next/navigation";

export async function resetPassAction(prev, formData) {

    const username = formData.get("username");
    const email = formData.get("email");
    const userId = formData.get("userId")

    const emailCadastrado = (await getUser(username)).email

    if (emailCadastrado != email) {
        return {
            erro: "Email diferente do cadastrado,verifique digitação",
            payload: formData
        }
    }


    ///gerando token aleatorio
    const tokenBuf = crypto.randomBytes(128);
    const token = tokenBuf.toString("hex");

    ///mandar token por email

    const resetLink = `http://localhost:3000/${username}/auth/reset-password/new-password?token=${token}`

    try {
        const info = await transporter.sendMail({
            from: '"MedTexto" <angelindigital@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Redefinição de Senha Solicitada', // Subject line
            html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Olá ${username || ''},</h2>
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
    `, text: "Você solicitou a redefinição da sua senha para o MedTexto.Por favor, clique no link abaixo para criar uma nova senha:" + resetLink, // plain text body


        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail", err);
        return {
            erro: "Error while sending mail",
            payload: formData
        }
    }

    ///resetar senha da database e colocar token
    try {
        let now = new Date();
        now.setHours(now.getHours() + 6)

        pool.query("UPDATE usuarios SET senha_hash = $1, token_recuperacao =$2,expiracao_token = $3  WHERE id = $4", [null, token, now, userId])

    } catch (error) {
        console.log(error, "erro ao atulizar database")
        return {
            payload: formData,
            erro: "Erro ao atualizar senha"
        }

    }

    return {
        status: "Link enviado, verifique caixa de entrada",
        payload: formData
    }

}

export async function newPasswordAction(prev, formData) {

    const username = formData.get("username")
    const token = formData.get("token")
    const password = formData.get("password")
    const passwordConfirmation = formData.get("passwordConfirmation")

    ///checar se usuario existe e retorar se não existir
    const isRealUser = (await getUser(username))
    if (!isRealUser) {
        return {
            erro: "Usuario não encontrado"
        }
    }
    const { id, token_recuperacao, expiracao_token } = isRealUser

    ///checar se senha confirma e atende requisito
    if (password != passwordConfirmation || password.length < 6) {
        return {
            erro: "Senha não confere, tente novamente"
        }
    }

    ///checar se token é válido
    let now = new Date()
    if (token != token_recuperacao || now > expiracao_token) {
        return {
            erro: "Token invalido ou token expirado, solicite nova senha",
            link: `/${username}/auth/reset-password`
        }
    }

    /// fazer o hash e mandar para database

    const hash = await hashPassword(password)

    try {
        pool.query("UPDATE usuarios SET senha_hash = $1, token_recuperacao =$2,expiracao_token = $3  WHERE id = $4",[hash, null, null, id])
    } catch (error) {
        console.error(error)
        return {
            erro: "Erro ao atualizar senha da database"
        }

    }

    ///redirecionar para pagina principal
    // return{
    //     erro:"Sucesso"
    // }

    redirect(`/${username}`)



}