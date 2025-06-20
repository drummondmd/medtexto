'use server'

import { pool } from "@/lib/databases/db-config"
import { connectToDatabase } from "@/lib/databases/mongoose-config"
import { Calculadora } from "@/lib/databases/mongo-models"

export async function updateCalculadora(calculadorasRelacionadas, entradas, referencias, FormData) {

  const titulo = FormData.get("titulo")
  const displayNome = FormData.get("displayNome")
  const descricao = FormData.get("descricao")
  const instrucoes = FormData.get("instrucoes")
  const slug = FormData.get("slug")
  const functionLogic = FormData.get("functionLogic")
  const evidencia = FormData.get("evidencia")
  try {
    await connectToDatabase()
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

export async function getContatos() {

  try {
    const result = await pool.query('SELECT * from contatos')
    return result.rows

  } catch (error) {
    console.error("Erro ao buscar dados na DB")
    return null

  }

}
