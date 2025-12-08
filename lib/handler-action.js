"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import deleteUserPgMongo from "@/actions/CRUD/delete/deleteUser";

import { handleArrayOfNotes, handleyArrayofArrayOfNotes } from "./databases/handler-mongodb";

///deletando usuario e redirecionando para homepage
async function delteUserHandle(user_id) {
  try {
    await deleteUserPgMongo(user_id);
  } catch (error) {
    console.error(error, "Erro no handle de deletar usuario");
  }
  redirect("/");
}

///handle para update, delete array of notas
async function noteHandle(crud, resource, user, selected) {
  try {
    const res = await handleArrayOfNotes(resource, crud, user.user_id, selected);
    if (res === false) {
      return {
        mensagem: "Erro ao deletar ou atualizar nota na database",
      };
    } else {
      revalidatePath(`/${user.username}`, "layout");
      revalidateTag("user-mongo", "max");
    }
  } catch (error) {
    console.error("Erro no Handler de deletar/atualizar nota", error);
    return {
      mensagem: "Erro ao deletar ou atualizar nota na database, tente novamente mais tarde.",
    };
  }
}

///handle para update, delete array of array of notas( somente resumos até o momento)
async function resumoHandle(item, crud, resource, user, cadernoId, data, usernameSlug) {
  try {
    const res = await handleyArrayofArrayOfNotes(
      resource,
      crud,
      user.user_id,
      data,
      false,
      cadernoId
    );
    if (res === false) {
      return {
        mensagem: "Erro ao deletar ou atualizar ou atualizar nota na database",
      };
    } else {
      ///ok
    }
  } catch (error) {
    console.error("Erro no Handler de deletar/atualizar nota", error);
    return {
      mensagem: "Erro ao deletar ou atualizar nota na database, tente novamente mais tarde.",
    };
  }

  revalidatePath(`/${user.username}`, "layout");
  revalidateTag("user-mongo", "max");

  if (crud === "delete") {
    redirect(`/${usernameSlug}/${resource}`);
  }
}

export { delteUserHandle, noteHandle, resumoHandle };
