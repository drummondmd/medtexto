import { pool } from "@/lib/databases/db-config"

export default async function AdminUsuarios(){
    const allUsers = await pool.query("SELECT * from usuarios")
    const rows = allUsers.rows

    return(
        <ul>
            {rows.map((elem)=><li key={elem.id}>{JSON.stringify(elem)}</li>)}

        </ul>

    )
}