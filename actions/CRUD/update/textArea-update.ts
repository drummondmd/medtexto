////updateAction of ArrayOfNotes.
"use server";

import { UpdateResult } from "mongoose";
import { updateTag } from "next/cache";

import { handleArrayOfNotes, NoteData } from "@/lib/databases/handler-mongodb";
import { UsuarioMongo } from "@/lib/databases/mongo-models";
import { connectToDatabase } from "@/lib/databases/mongoose-config";

export type APIUpdateFunction = (
  userId: string,
  content: string,
  dataForArray?: NoteData,
  resource?: "receituarios" | "evolucoes"
) => Promise<{ success: boolean; message: string }>;

export const updateNoteOfArray: APIUpdateFunction = async (
  userId,
  content,
  dataForArray,
  resource
) => {
  ///fazer ajuste manual para o conteudo editado corresponder a dataForArray.
  const modifiedData = dataForArray;
  modifiedData.conteudo = content;
  try {
    const response = await handleArrayOfNotes(resource, "update", userId, modifiedData);
    if (!response) {
      return { success: false, message: "Erro ao atualizar" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao atualizar" };
  }

  updateTag("user-mongo");
  return { success: true, message: "Atualizado com sucesso." };
};

export async function updateBloco(
  userID: string,
  conteudo: string
): Promise<{ success: boolean; message: string }> {
  if (!userID) return { success: false, message: "Usuário não definido" };

  await connectToDatabase();

  try {
    const response = (await UsuarioMongo.updateOne(
      { user_id: userID },
      { $set: { blocosDeNotas: conteudo } }
    )) as UpdateResult;
    ///
    if (!response.acknowledged) {
      return { success: false, message: "Nenhum documento foi atualizado." };
    }
  } catch (error) {
    console.error(error, "Erro ao atualizar dados no mongoDB");
    return { success: false, message: "Erro ao atualizar." };
  }
  updateTag("user-mongo");
  return { success: true, message: "Atualizado com sucesso." };
}
