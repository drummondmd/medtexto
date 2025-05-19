'use server'

import { pool } from "@/lib/databases/db-config";
import { getUser } from "@/lib/databases/handler-pgdb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeProtectStatus(user, status) {
    const userId = user.id;
    const userAwser = status === "true"?true:false
    const senhaDatabase = (await getUser(user.username)).senha_hash

    //atualizar db com resposta
    try {
        pool.query("UPDATE usuarios SET senha_desejada = $1 WHERE id = $2", [userAwser, userId])
    } catch (error) {
        console.error(error, "Erro ao atulizar db")
        return false

    }

    if (userAwser === true && senhaDatabase === null) {
        redirect(`/${user.username}/auth/reset-password`)
    } else if (userAwser === true) {
        revalidatePath(`/${user.username}/`)
        redirect(`/${user.username}/auth/signin`)
    } else {
        return true
    }

}

///verificar email depois
export async function verifyEmail(user) {

}