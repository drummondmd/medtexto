"use server";

import { updateTag } from "next/cache";

import { handleArrayOfNotes, NoteData } from "@/lib/databases/handler-mongodb";

type functionType = (
  resource: "evolucoes" | "receituarios",
  userId: string,
  note: NoteData
) => Promise<{ success: boolean; message: string }>;

export const deleteOfSelector: functionType = async (resource, userId, note) => {
  try {
    const serverResponse = await handleArrayOfNotes(resource, "delete", userId, note);
    if (!serverResponse) {
      return { success: false, message: "Erro ao deletar" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao deletar" };
  }

  updateTag("user-mongo");
  return { success: true, message: "Deletado" };
};
