'use server'

///import pool
import { pool } from "./db-config.js"
import { cache } from "react"
import { unstable_cache } from "next/cache.js"


///usando unstable_cache para usuario e perfil que raramente mudam,para otimizar um pouco
////# BUSCANDO USUARIOS
///get user para dados do usuario, retorna nulo se nada for encontrado

const getUser = unstable_cache(async function getUser(userName, email) {

  let usuario;
  //checa email e username
  if (email) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [userName, email])
      if (result.rowCount === 0) {
        usuario = null
      } else {
        usuario = result.rows[0]
      }
      return usuario

    } catch (error) {
      console.log(error)
      throw new Error("Erro na obtenção dos usuarios da database")
    }

  }

  ///busca por username
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [userName])
    if (result.rowCount === 0) {
      usuario = null
    } else {
      usuario = result.rows[0]
    }
    return usuario

  } catch (error) {
    console.log(error)
    throw new Error("Erro na obtenção dos usuarios da database")
  }
})

///buscando perfil de usuario
export const getUserProfile = unstable_cache(async function getUserProfile(user_id) {
  try {
    const result = await pool.query(`SELECT * FROM user_profiles WHERE user_id =$1`, [user_id])
    if (result.rowCount > 0) {
      return result.rows[0]
    }
    else {
      return null
    }

  } catch (error) {
    console.error("erro ao buscar perfil de usuario", error)
    return null

  }

},[],{revalidate:60,tags:["user-profile"]})

//##CRIANDO,ATUALIZANDO E DELETANDO USUARIOS
////Criando usuario
async function createUser(user) {
  let today = new Date()
  try {
    const result = await pool.query(`
      INSERT INTO USUARIOS (username,senha_desejada,nome,sobrenome,email,senha_hash,data_criacao)
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING id`
      , [user.userName, user.senhaDesejada, user.nome, user.sobrenome, user.email, user.senha, today])
    const idObj = result.rows[0]
    return idObj

  } catch (error) {
    console.log("Erro na database")
  }

}

//update user
async function updateUser(user) {

  let today = new Date()
  const array = [user.data_nascimento, user.tipo_usuario, user.instituicao_ensino, user.ano_formacao, user.especialidade, user.crm, user.telefone, user.local_trabalho, today, user.id]
  try {
    pool.query(`
      UPDATE user_profiles
      SET data_nascimento = $1,tipo_usuario=$2,instituicao_ensino =$3,ano_formacao=$4,especialidade=$5,crm=$6,telefone=$7,local_trabalho=$8,data_atualizacao=$9
      WHERE user_id= $10  `
      , array)

  } catch (error) {
    console.log("Erro na database")
  }

}

//update user login
async function updateUltimoLogin(user) {

  let today = new Date()
  try {
    pool.query(`
      UPDATE USUARIOS
      SET ultimo_login = $1
      WHERE id= $2  `
      , [today, user.id])

  } catch (error) {
    console.log("Erro na database ao incluir pessoa")
  }

}

//update homepage
async function upadteHomepage(user, homepage) {

  try {
    pool.query(`
      UPDATE user_profiles
      SET homepage = $1
      WHERE user_id= $2  `
      , [homepage, user.user_id])

  } catch (error) {
    console.log("Erro na database ao incluir pessoa")
  }

}

///delete user
async function deleteUser(user_id) {
  try {
    pool.query(`
      DELETE FROM users
      WHERE id= $1  `
      , [user_id])

  } catch (error) {
    console.log("Erro na database")
  }

}

///### Registro de logins de usuarios
async function loginRegistrer(username, id, cidade, estado) {
  const today = new Date()
  try {
    pool.query(`
      INSERT INTO logins (username_id,username,timestamp,cidade,estado)
      VALUES ($1,$2,$3,$4,$5)
      `, [id, username, today, cidade, estado])
  } catch (error) {
    console.log(error, "Erro ao inserar dado na database de login")
  }
}

///
export async function getLoginStats() {

  try {
    const total = await pool.query(`SELECT
      COUNT(*)
      FROM users`)


    const resumo = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE timestamp >= NOW() - INTERVAL '1 day') AS acessos_dia,
        COUNT(*) FILTER (WHERE DATE_TRUNC('month', timestamp) = DATE_TRUNC('month', CURRENT_DATE)) AS acessos_mes,
        COUNT(*) FILTER (WHERE DATE_TRUNC('year', timestamp) = DATE_TRUNC('year', CURRENT_DATE)) AS acessos_ano
      FROM logins
    `);

    const porCidade = await pool.query(`
      SELECT cidade, estado, COUNT(*) AS acessos
      FROM logins
      WHERE DATE_TRUNC('month', timestamp) = DATE_TRUNC('month', CURRENT_DATE)
      GROUP BY cidade, estado
      ORDER BY acessos DESC
    `);

    return {
      total: total.rows[0],
      resumo: resumo.rows[0],
      localizacoes: porCidade.rows
    };

  } catch (err) {
    console.error('Erro ao buscar estatísticas:', err);
    return null;
  }

}



export { getUser, createUser, updateUser, updateUltimoLogin, deleteUser, loginRegistrer, upadteHomepage }
