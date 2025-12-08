import { pool } from "@/lib/databases/db-config";
import { UsuarioMongo } from "@/lib/databases/mongo-models";
import { connectToDatabase } from "@/lib/databases/mongoose-config";

export default async function deleteUserPgMongo(
  user_id: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const pgDelete = (await pool.query(`DELETE FROM users WHERE id= $1  `, [user_id])) as {
      rowCount: number;
    };
    if (pgDelete.rowCount > 0) {
      await connectToDatabase()
      const mongoDelete = await UsuarioMongo.deleteOne({ user_id: [user_id] });
      if (mongoDelete.acknowledged) {
        return { success: true };
        ///pg e mongodeletados
      } else {
        console.error("pg deletado, mas mongo não deletado");
        return { success: false, message: "pg deletado, mas mongo não deletado" };
      }
    } else {
      console.error("erro ao deletar user na pg");
      return { success: false, message: "erro ao deletar user na pg" };
    }
  } catch (error) {
    console.error("Erro na database", error);
    return { success: false, message: "Erro ao excluir contas da db" };
  }
}
