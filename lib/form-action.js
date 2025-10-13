'use server'

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUser, updateUser, deleteUser, getUserProfile } from "./databases/handler-pgdb";
import { createUserMongo, handleArrayOfNotes, handleyArrayofArrayOfNotes } from "./databases/handler-mongodb";
import { hashPassword } from "./hash/hash";
import { pool } from "./databases/db-config";

///checar itens validos( util nas proximas)
function isInvalid(text) {
    return !text || text.trim() === "";
}

///handle form na pagina inicial
async function createUserForm(prevState, formData) {

    const user = {
        username: formData.get("username").toLowerCase(),
        nome: formData.get("nome"),
        sobrenome: formData.get("sobrenome"),
        email: formData.get("email"),
        senhaDesejada: formData.get("senhaDesejada") === "true" ? true : false,
        //fazer o hash da senha depois
        senha: isInvalid(formData.get("senha")) ? null : formData.get("senha"),
        senhaConfirma: isInvalid(formData.get("senhaConfirma")) ? null : formData.get("senhaConfirma"),
    }
    /// checar se client ou user ja cadastrado

    let alreadyUser = await getUser(user.username, user.email)

    if (alreadyUser) {
        return {
            payload: formData,
            mensagem: "Email ou username já cadastrados.",
        }

    }

    ///retornar erro se cliente quer protejer com senha, mas não a digitou
    if (user.senhaDesejada && isInvalid(user.senha) || user.senha != user.senhaConfirma) {
        return {
            ///if error
            payload: formData,
            mensagem: "Preencha uma senha válida",
        }
        ///retornar se algum outro erro

    } if (isInvalid(user.username) ||
        isInvalid(user.nome) ||
        isInvalid(user.sobrenome) ||
        isInvalid(user.email) ||
        !user.email.includes("@")) {
        return {
            ///if error
            payload: formData,
            mensagem: "Dados inválidos.",
        }
    }

    ///se cliente desejar senha fazer o hash da senha

    if (user.senhaDesejada) {
        user.senha = await hashPassword(user.senha)
    }

    let today = new Date()

    //se tudo der certo incluir na database do pg
    try {
        const result = await pool.query(`
            INSERT INTO users (username,email,senha_hash,data_criacao,data_atualizacao)
            VALUES($1,$2,$3,$4,$5)
            RETURNING id
            `, [user.username, user.email, user.senha, today, today])
        const row = result.rows[0]
        const user_id = row.id;
        ///após conseguir id nova, criar o perfil do usuario e o usuario no mongo.
        try {
            const result = await pool.query(`
                INSERT INTO user_profiles(user_id,nome,sobrenome,senha_desejada,data_atualizacao)
                VALUES($1,$2,$3,$4,$5)
                `, [user_id, user.nome, user.sobrenome, user.senhaDesejada, today])

            if (result.rowCount > 0) {
                ///deu certo, seguir adiante e criar usuario mongo
                await createUserMongo({ id: user_id, userName: user.username })

            } else {
                throw new Error("Erro ao criar perfil de usuario")
            }



        } catch (error) {
            ///se erro ao criar profile e usuario no mongo deletar usuario no users
            console.error(error)
            await deleteUser({ id: user_id })
            return {
                ///if error na database ( profile,MongoUser)
                payload: formData,
                mensagem: "Erro ao criar usuário,contate o administrador",
            }

        }

    } catch (error) {
        console.error(error)
        return {
            ///if error na database
            payload: formData,
            mensagem: "Erro ao inserir dados na database",
        }

    }

    ///posteriormente criar token de confirmação de email e enviar mensagem no email.


    revalidatePath(`/${user.username}`);
    redirect(`/${user.username}`);
}

///handle update usuarios
async function updateUserForm(prevState, formData) {
    //buscar info do usuario para comparar

    const prevInfo = await getUserProfile(formData.get("user_id"))

    ///organizando dados e colocando dados previos para dados em branco
    const data = {
        username: formData.get("username"),
        id: prevInfo.user_id,
        data_nascimento: isInvalid(formData.get("data_nascimento")) ? prevInfo.data_nascimento : formData.get("data_nascimento"),
        tipo_usuario: isInvalid(formData.get("tipo_usuario")) ? prevInfo.tipo_usuario : formData.get("tipo_usuario"),
        instituicao_ensino: isInvalid(formData.get("instituicao_ensino")) ? prevInfo.instituicao_ensino : formData.get("instituicao_ensino"),
        ano_formacao: isInvalid(formData.get("ano_formacao")) ? prevInfo.ano_formacao : formData.get("ano_formacao"),
        especialidade: isInvalid(formData.get("especialidade")) ? prevInfo.especialidade : formData.get("especialidade"),
        crm: isInvalid(formData.get("crm")) ? prevInfo.crm : formData.get("crm"),
        telefone: isInvalid(formData.get("telefone")) ? prevInfo.telefone : formData.get("telefone"),
        local_trabalho: isInvalid(formData.get("local_trabalho")) ? prevInfo.local_trabalho : formData.get("local_trabalho"),
    }

    try {
        await updateUser(data)

    } catch (error) {
        console.error(error)
        return {
            payload: formData,
            mensagem: "Erro ao atualizar os dados, tente novamente mais tarde."
        }

    }

    revalidatePath(`/${data.username}`, 'layout');
    revalidateTag(`user-profile`);
    redirect(`/${data.username}/perfil-e-configuracoes`);




}

//criando receituario,evolução e resumos.
async function createReceituario(prevState, formData) {

    const data = {
        userName: formData.get("userName"),
        userId: formData.get("userId"),
        titulo: formData.get("titulo"),
        conteudo: formData.get("conteudo")
    }

    if (isInvalid(data.userId) ||
        isInvalid(data.titulo) ||
        isInvalid(data.conteudo)) {
        return {
            payload: formData,
            mensagem: "Preencha todos os dados corretamente"
        }
    }

    try {
        const result = await handleArrayOfNotes("receituarios", "create", data.userId, data)
        if (result === true) {
            revalidatePath(`/${data.userName}/receituarios`);
            revalidateTag("user-mongo")
            return {
                payload: formData,
                mensagem: "Salvo"
            }

        } else {
            return {
                payload: formData,
                mensagem: "Aconteceu algum erro ao tentar salvar"
            }

        }



    } catch (error) {
        console.error(error)
        return {
            payload: formData,
            mensagem: "Algum erro aconteceu ao inserir no banco de dados"
        }

    }
}

async function createEvolucao(prevState, formData) {

    const data = {
        userId: formData.get("userId"),
        titulo: formData.get("titulo"),
        conteudo: formData.get("conteudo")
    }

    if (
        isInvalid(data.userId) ||
        isInvalid(data.titulo) ||
        isInvalid(data.conteudo)) {
        return {
            payload: formData,
            mensagem: "Preencha todos os dados corretamente"
        }
    }

    try {
        const result = await handleArrayOfNotes("evolucoes", "create", data.userId, data)
        if (result === true) {
            revalidatePath(`/${data.userName}/evolucoes`);
            revalidateTag("user-mongo")
            return {
                payload: formData,
                mensagem: "Salvo"
            }

        } else {
            return {
                payload: formData,
                mensagem: "Aconteceu algum erro ao tentar salvar"
            }

        }



    } catch (error) {
        console.error(error)
        return {
            payload: formData,
            mensagem: "Algum erro aconteceu ao inserir no banco de dados"
        }

    }
}

async function createResumoForm(prevState, formData) {

    const data = {
        username: formData.get("username"),
        userId: formData.get("userId"),
        cadernoExistente: formData.get("cadernoExistente"),
        caderno: formData.get("caderno"),
        titulo: formData.get("titulo"),
        conteudo: formData.get("conteudo")
    }

    let isNew;
    let checkCaderno;

    if (data.cadernoExistente === null || data.cadernoExistente == "Selecionar caderno...") {
        isNew = true;
        checkCaderno = data.caderno
    } else {
        isNew = false;
        checkCaderno = data.cadernoExistente
    }

    if (isInvalid(data.userId) ||
        isInvalid(data.titulo) ||
        isInvalid(data.conteudo) ||
        isInvalid(checkCaderno)) {
        return {
            payload: formData,
            mensagem: "Preencha todos os dados corretamente"
        }
    }
    try {
        let result;
        if (isNew) {
            result = await handleyArrayofArrayOfNotes("resumos", "create", data.userId, data, true)
            ///adionar novo caderno e nota
            // const result = await handleArrayOfNotes("evolucoes","create",data.userId,data)
            //  result = true



        } else {
            result = await handleyArrayofArrayOfNotes("resumos", "create", data.userId, data, false, data.cadernoExistente)
            ///adionar caminho posteriormente
            // result = false;
            //adionar nota a caderno existente

        }

        if (result === true) {
            revalidatePath(`/${data.username}/resumos`);
            revalidateTag("user-mongo")
            return {
                payload: formData,
                mensagem: "Salvo"
            }

        } else {
            return {
                payload: formData,
                mensagem: "Aconteceu algum erro ao tentar salvar"
            }

        }



    } catch (error) {
        console.error(error)
        return {
            payload: formData,
            mensagem: "Algum erro aconteceu ao inserir no banco de dados"
        }

    }
}




export { createUserForm, updateUserForm, createReceituario, createEvolucao, createResumoForm };