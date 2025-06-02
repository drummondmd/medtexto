'use server'

import { pool } from "@/lib/databases/db-config";
import { redirect } from "next/navigation";

export default async function contactForm(formData){

    ///função simples, sem checar erros direito e sem voltar para usuario, só redirecionando se tudo der certo

    function isInvalid(text) {
        return !text || text.trim() === "";
    }

    const user =  formData.get("user");
    const email =  formData.get("email");
    const motivo =  formData.get("motivo");
    const mensagem =  formData.get("mensagem");
    const emailResponse =  formData.get("emailResponse") == "sim"?true:false;


    if(isInvalid(user)||isInvalid(email)||isInvalid(email)||isInvalid(motivo)||isInvalid(mensagem)){
        console.log("informação errada do usuário")
        return {erro:"Insira os dados corretamentes ou tente novamente mais tarde"}
    }

    try {
        const response = await pool.query(`INSERT INTO contatos (user_name,email,motivo,mensagem,email_response)
            VALUES($1,$2,$3,$4,$5)`,[user,email,motivo,mensagem,emailResponse])

    } catch (error) {
        console.log("erro ao processar inserção em database");


    }

    redirect(`/${user}`)
}