import { pool } from "./db-config"

export default async function getTokenFromDb(token){
    try {
        const result = await pool.query('SELECT * FROM user_tokens WHERE token = $1',[token])
        if(result.rowCount>0){
            return result.rows[0]
        }
    } catch (error) {
        console.log(error)
        throw new Error("Erro ao recuperar token da database")

    }

}