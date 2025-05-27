'use server'

import { Calculadora } from "@/lib/databases/db-config"

export async function updateCalculadora(calculadorasRelacionadas,entradas,referencias,FormData){

    const titulo = FormData.get("titulo")
    const displayNome = FormData.get("displayNome")
    const descricao = FormData.get("descricao")
    const instrucoes = FormData.get("instrucoes")
    const slug = FormData.get("slug")
    const functionLogic = FormData.get("functionLogic")
    const evidencia = FormData.get("evidencia")

    console.log(entradas[0])

    // console.log(entradas[3])

    // return false

      try {
    const result = await Calculadora.updateOne(
      { slug },
      {
        $set: {
          titulo: titulo,
          descricao: descricao,
          instrucoes: instrucoes,
          slug: slug,
          functionLogic: functionLogic,
          evidencia: evidencia,
          entradas: entradas,
          referencias: referencias || [],
          calculadorasRelacionadas: calculadorasRelacionadas || []
        },
      }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Erro ao atualizar calculadora no MongoDB:", error);
    return false;
  }



}
