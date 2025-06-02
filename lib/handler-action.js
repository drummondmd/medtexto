'use server'

import { revalidatePath } from "next/cache";
import { handleArrayOfNotes, handleyArrayofArrayOfNotes } from "./databases/handler-mongodb";
import { redirect } from 'next/navigation'
import { deleteUser } from "./databases/handler-pgdb";


///deletando usuario e redirecionando para homepage
async function delteUserHandle(user_id) {
    try {
        await deleteUser(user_id)
    } catch (error) {
        console.log(error, "Erro no handle de deletar usuario")
    }
    redirect("/")
}

async function noteHandle(crud, resource, user, selected) {
    try {
        const res = await handleArrayOfNotes(resource, crud, user.user_id, selected);
        if (res === false) {
            return {
                mensagem: "Erro ao deletar ou atualizar nota na database"
            }
        } else {
            revalidatePath(`/${user.username}/${resource}`);
        }

    } catch (error) {
        console.error("Erro no Handler de deletar/atualizar nota", error);
        return {
            mensagem: "Erro ao deletar ou atualizar nota na database, tente novamente mais tarde."
        }
    }
}

async function resumoHandle(item, crud, resource, user, cadernoId, data, usernameSlug) {

    try {
        const res = await handleyArrayofArrayOfNotes(resource, crud, user.user_id, data, false, cadernoId);
        if (res === false) {
            return {
                mensagem: "Erro ao deletar ou atualizar ou atualizar nota na database"
            }
        } else {
            ///ok

        }

    } catch (error) {
        console.error("Erro no Handler de deletar/atualizar nota", error);
        return {
            mensagem: "Erro ao deletar ou atualizar nota na database, tente novamente mais tarde."
        }
    }

    revalidatePath(`/${usernameSlug}/${resource}`);
    if (crud === "delete") {
        redirect(`/${usernameSlug}/${resource}`)
    }

}


export { delteUserHandle, noteHandle, resumoHandle };