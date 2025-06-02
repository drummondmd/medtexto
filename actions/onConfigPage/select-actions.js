'use server'

import { pool } from "@/lib/databases/db-config";
import { getUser } from "@/lib/databases/handler-pgdb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeProtectStatus(user,userNameSlug, status,isSenhaDefinida) {
    const userId = user.user_id;
    const userAwser = status === "true"?true:false
    //atualizar db com resposta
    try {
        pool.query("UPDATE user_profiles SET senha_desejada = $1 WHERE user_id = $2", [userAwser, userId])
    } catch (error) {
        console.error(error, "Erro ao atulizar db")
        return false

    }

    if (userAwser === true && isSenhaDefinida === false) {
        redirect(`/${userNameSlug}/auth/reset-password`)
    } else if (userAwser === true) {
        revalidatePath(`/${userNameSlug}/`)
        redirect(`/${userNameSlug}/auth/signin`)
    } else {
        return true
    }

}

///verificar email depois
export async function verifyEmail(user) {

}