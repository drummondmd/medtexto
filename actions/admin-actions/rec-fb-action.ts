"use server";

import { pool } from "@/lib/databases/db-config";

export default async function receituarioFb(
  recurso: "recToText" | "textToRec" | "desmamePred",
  input: string,
  output: string
): Promise<void> {
  try {
    await pool.query(
      `
        INSERT INTO receituario_feedback
        (user_id,recurso,input_data,output_data,created_at)
        VALUES($1,$2,$3,$4,$5)
        `,
      ["undefined", recurso, input, output, new Date()]
    );
  } catch (error) {
    console.error("erro ao lançar fb no banco de dados", error);
  }
}
