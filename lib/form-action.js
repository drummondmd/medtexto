'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUser, getUser, updateUser, deleteUser } from "./databases/handler-pgdb";
import { createUserMongo, handleArrayOfNotes, handleyArrayofArrayOfNotes } from "./databases/handler-mongodb";
import { hashPassword } from "./hash/hash";

///checar itens validos( util nas proximas)
function isInvalid(text) {
    return !text || text.trim() === "";
}

///handle form na pagina inicial
async function createUserForm(prevState, formData) {

    const user = {
        userName: formData.get("username").toLowerCase(),
        nome: formData.get("nome"),
        sobrenome: formData.get("sobrenome"),
        email: formData.get("email"),
        senhaDesejada: formData.get("senhaDesejada") === "true" ? true : false,
        //fazer o hash da senha depois
        senha: isInvalid(formData.get("senha")) ? null : formData.get("senha"),
        senhaConfirma: isInvalid(formData.get("senhaConfirma")) ? null : formData.get("senhaConfirma"),
    }
    /// checar se client ou user ja cadastrado

    let alreadyUser = await getUser(user.userName, user.email)

    if (alreadyUser) {
        return {
            payload: formData,
            mensagem: "Email ou user name cadastrados.",
        }

    }

    ///retornar erro se cliente quer protejer com senha, mas não a digitou
    if (user.senhaDesejada && isInvalid(user.senha)||user.senha != user.senhaConfirma) {
        return {
            ///if error
            payload: formData,
            mensagem: "Preencha uma senha válida",
        }
        ///retornar se algum outro erro

    } if (isInvalid(user.userName) ||
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

    if(user.senhaDesejada){
        user.senha = await hashPassword(user.senha)
    }



    //se tudo der certo incluir na database do pg
    try {
        const idObj = await createUser(user);
        const id = idObj.id;

        ///dando certo incluir na db do mongo
        try {
            ////função para adicionar novo usuario
            const result = await createUserMongo({ id: id, userName: user.userName })

        } catch (error) {
            console.log(error)
            ///deletar usuario pg?
            await deleteUser({ id: id })
            return {
                payload: formData,
                mensagem: "Erro ao criar database Mongo"

            }
        }


    } catch (error) {
        console.log(error)
        return {
            ///if error na database
            payload: formData,
            mensagem: "Erro ao inserir dados na database",
        }

    }
    revalidatePath(`/${user.userName}`);
    redirect(`/${user.userName}`);
}

///handle update usuarios
async function updateUserForm(prevState, formData) {
    //buscar info do usuario para comparar

    const prevInfo = await getUser(formData.get("username"))

    ///organizando dados e colocando dados previos para dados em branco
    const data = {
        id: prevInfo.id,
        username: formData.get("username"),
        data_nascimento: isInvalid(formData.get("data_nascimento")) ? prevInfo.data_nascimento : formData.get("data_nascimento"),
        tipo_usuario: isInvalid(formData.get("tipo_usuario")) ? prevInfo.tipo_usuario : formData.get("tipo_usuario"),
        instituicao_ensino: isInvalid(formData.get("instituicao_ensino")) ? prevInfo.instituicao_ensino : formData.get("instituicao_ensino"),
        ano_formacao: isInvalid(formData.get("ano_formacao")) ? prevInfo.ano_formacao : formData.get("ano_formacao"),
        especialidade: isInvalid(formData.get("especialidade")) ? prevInfo.especialidade : formData.get("especialidade"),
        crm: isInvalid(formData.get("crm")) ? prevInfo.crm : formData.get("crm"),
        telefone: isInvalid(formData.get("telefone")) ? prevInfo.telefone : formData.get("telefone"),
        telefone_alternativo: isInvalid(formData.get("telefone_alternativo")) ? prevInfo.telefone_alternativo : formData.get("telefone_alternativo"),
    }

    try {
        await updateUser(data)

    } catch (error) {
        console.log(error)
        return {
            payload: formData,
            mensagem: "Erro ao atualizar os dados, tente novamente mais tarde."
        }

    }

    revalidatePath(`/${data.username}`);
    redirect(`/${data.username}/perfil-e-configuracoes`);



}

//criando receituario
async function createReceituario(prevState, formData) {

    const data = {
        userName: formData.get("userName"),
        userId: formData.get("userId"),
        titulo: formData.get("titulo"),
        conteudo: formData.get("conteudo")
    }

    if (isInvalid(data.userName) ||
        isInvalid(data.userId) ||
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
        userName: formData.get("userName"),
        userId: formData.get("userId"),
        titulo: formData.get("titulo"),
        conteudo: formData.get("conteudo")
    }

    if (isInvalid(data.userName) ||
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
        userName: formData.get("userName"),
        userId: formData.get("userId"),
        cadernoExistente: formData.get("cadernoExistente"),
        caderno: formData.get("caderno"),
        titulo: formData.get("titulo"),
        conteudo: formData.get("conteudo")
    }

    let isNew;
    let checkCaderno;

    if(data.cadernoExistente === null || data.cadernoExistente == "Selecionar caderno..."){
        isNew = true;
        checkCaderno = data.caderno
    }else{
        isNew = false;
        checkCaderno =data.cadernoExistente
    }

    if (isInvalid(data.userName) ||
        isInvalid(data.userId) ||
        isInvalid(data.titulo) ||
        isInvalid(data.conteudo)||
        isInvalid(checkCaderno)){
        return {
            payload: formData,
            mensagem: "Preencha todos os dados corretamente"
        }
    }
    try {
        let result;
        if(isNew){
            result = await handleyArrayofArrayOfNotes("resumos","create",data.userId,data,true)
            ///adionar novo caderno e nota
            // const result = await handleArrayOfNotes("evolucoes","create",data.userId,data)
            //  result = true



        }else{
            result = await handleyArrayofArrayOfNotes("resumos","create",data.userId,data,false,data.cadernoExistente)
            ///adionar caminho posteriormente
            // result = false;
            //adionar nota a caderno existente

        }

        if(result === true){
            revalidatePath(`/${data.userName}/resumos`);
            return {
                payload:formData,
                mensagem: "Salvo"
            }

        }else{
            return {
                payload:formData,
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