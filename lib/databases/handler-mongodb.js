'use server'

import { Calculadora, UsuarioMongo } from "./mongo-models";
import { mongoose } from "mongoose";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { connectToDatabase } from "./mongoose-config";

//##### MONGO DB ########/

////create mongoUser
async function createUserMongo(user) {
  try {
  await connectToDatabase()


    const result = await UsuarioMongo.insertOne({
      user_id: user.id,
      userName: user.userName
    });


    ///ver uma forma de validar dados depois.
  } catch (error) {
    console.log(error, "Erro ao inserir entrada na mongoDB")
    throw new Error("Erro ao inserir entrada na mongoDB")
  }
}

///acessando dados dos usuarios na mongoDB.

const getUserMongo = unstable_cache(async function getUserMongo(user_id) {
  await connectToDatabase()
  try {
    const result = await UsuarioMongo.findOne({ user_id: user_id }).lean();
    if (result.length === 0) {
      console.log("Resultado vazio,usuario não encontrado")
      revalidateTag("user-mongo")
      return null
    }
    return result

  } catch (error) {
    console.log(error, "Erro ao buscar dados na MongoDb")
    revalidateTag("user-mongo")
    return null

  }
}, [], { revalidate: 60, tags: ["user-mongo"] })

///###EVOLUÇÕES, Receituarios, qualquer array of notes####

async function handleArrayOfNotes(resource, crud, userId, data) {
    await connectToDatabase()

  let response;
  const noteId = new mongoose.Types.ObjectId(data["_id"]);

  switch (crud) {
    case "create":
      await createNote()
      break;
    case "update":
      await updateNote()
      break;
    case "delete":
      await deleteNote()
      break;
    default: null
      break;
  }

  async function createNote() {
    try {
      const result = await UsuarioMongo.updateOne({ "user_id": userId }, { $push: { [resource]: { titulo: data.titulo, conteudo: data.conteudo } } })
      if (result.modifiedCount > 0) {
        response = true
      } else {
        console.log("Algum erro aconteceu ao inserir dado dentro do array")
        response = false
      }

    } catch (error) {
      console.error("erro ao inserir dados no mongo", error)

    }
  }

  async function deleteNote() {
    try {
      const result = await UsuarioMongo.updateOne(
        { user_id: userId }, // Filtra o usuário
        { $pull: { [resource]: { _id: noteId } } } // Remove pelo ID
      );
      if (result.modifiedCount > 0) {
        response = true
      } else {
        console.log("Não encontrado arquivo solicitado para alterar")
        response = false
      }

    } catch (error) {
      console.error("Erro ao deletar nota na Mongo", error)
    }

  }

  async function updateNote() {
    try {
      const result = await UsuarioMongo.updateOne(
        { user_id: userId, [`${resource}._id`]: noteId },
        { $set: { [`${resource}.$.titulo`]: data.titulo, [`${resource}.$.conteudo`]: data.conteudo } }
      );
      if (result.modifiedCount > 0) {
        response = true
      } else {
        console.log("Não encontrado arquivo solicitado para alterar")
        response = false
      }

    } catch (error) {
      console.error("Erro ao deletar nota na Mongo", error)
    }

  }

  return response


}

async function handleyArrayofArrayOfNotes(resource, crud, userId, data, isNewArray, caderno_id) {
    await connectToDatabase()

  let response;
  let cadernoId;

  if (!isNewArray) {
    cadernoId = new mongoose.Types.ObjectId(caderno_id)
  }

  // const noteId =new mongoose.Types.ObjectId(data["_id"]);


  switch (crud) {
    case "create":
      if (isNewArray) {
        cadernoId = await createCaderno()
      }
      await createNote()
      break;
    case "update":
      await updateNote()
      break;
    case "delete":
      await deleteNote()
      break;
    case "delete-caderno":
      await deleteCaderno()

      break;

    default: null
      break;
  }

  async function createCaderno() {
    const newObj = {
      _id: new mongoose.Types.ObjectId(), // Gerando um ID manualmente;
      titulo: data.caderno
    }
    try {
      const result = await UsuarioMongo.updateOne({ "user_id": userId }, { $push: { [resource]: newObj } })
      if (result.modifiedCount > 0) {
        return newObj["_id"]
      } else {
        console.log("Algum erro aconteceu criar caderno")
        return null
      }

    } catch (error) {
      console.error("erro ao inserir dados no mongo", error)

    }
  }

  async function deleteCaderno() {
    try {
      const result = await UsuarioMongo.updateOne(
        { user_id: userId, [`${resource}._id`]: cadernoId },
        { $pull: { [`${resource}`]: { _id: cadernoId } } }
      );
      if (result.modifiedCount > 0) {
        response = true
      } else {
        console.log("Algum erro aconteceu ao apagar dado dentro do array")
        response = false
      }

    } catch (error) {
      console.error("Erro ao deletar nota na Mongo", error)
    }

  }


  async function createNote() {
    try {

      const result = await UsuarioMongo.updateOne(
        { user_id: userId, [`${resource}._id`]: cadernoId },
        {
          $push: {
            [`${resource}.$[outer].notas`]: { titulo: data.titulo, conteudo: data.conteudo }
          }
        },
        { arrayFilters: [{ "outer._id": cadernoId }] } // Garante que está acessando o array correto
      );

      if (result.modifiedCount > 0) {
        response = true
      } else {
        console.log("Algum erro aconteceu ao inserir dado dentro do array")
        response = false
      }

    } catch (error) {
      console.error("erro ao inserir dados no mongo", error)

    }
  }

  async function deleteNote() {
    try {
      const result = await UsuarioMongo.updateOne(
        { user_id: userId, [`${resource}.notas._id`]: data._id },
        { $pull: { [`${resource}.$.notas`]: { _id: data._id } } }
      );

      if (result.modifiedCount > 0) {
        response = true
      } else {
        console.log("Algum erro aconteceu ao apagar dado dentro do array")
        response = false
      }

    } catch (error) {
      console.error("Erro ao deletar nota na Mongo", error)
    }

  }

  async function updateNote() {
    try {
      const result = await UsuarioMongo.updateOne(
        { user_id: userId },
        {
          $set: {
            [`${resource}.$[outer].notas.$[inner].titulo`]: data.titulo,
            [`${resource}.$[outer].notas.$[inner].conteudo`]: data.conteudo
          }
        },
        {
          arrayFilters: [
            { "outer._id": cadernoId },  // Encontra o objeto correto dentro do array resource
            { "inner._id": data._id }  // Encontra a nota correta dentro do array notas
          ]
        }
      );
      if (result.modifiedCount > 0) {
        response = true
      } else {
        console.log("Algum erro aconteceu ao atualizar dado dentro do array", result)
        response = false
      }

    } catch (error) {
      console.error("Erro ao atualizar nota na Mongo", error)
    }

  }

  return response


}




////###Bloco de notas###
///save

async function updateBloco(user, conteudo) {
    await connectToDatabase()

  ///fazer validação de erros depois
  try {
    const updateResult = await UsuarioMongo.updateOne({ user_id: user.user_id }, { $set: { blocosDeNotas: conteudo } })
  } catch (error) {
    console.error(error, "Erro ao atualizar dados no mongoDB")
  }
  revalidateTag("user-mongo")

}

///
async function updateReceituarioTransforma(user, conteudo) {
    await connectToDatabase()

  ///fazer validação de erros depois
  try {
    const updateResult = await UsuarioMongo.updateOne({ user_id: user.id }, { $set: { "receituarioTransforma.input": conteudo.input } })
    const updateResult1 = await UsuarioMongo.updateOne({ user_id: user.id }, { $set: { "receituarioTransforma.output": conteudo.output } })
  } catch (error) {
    console.log(error, "Erro ao atualizar dados no mongoDB")
  }

}


////////##### Calculadoras


const getCalculadoras = unstable_cache(async function getCalculadoras() {
  await connectToDatabase()
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const result = await Calculadora.find({}, { titulo: 1, descricao: 1, slug: 1, _id: 1 }).lean();

    if (!result || result.length === 0) {
      console.log("Nenhuma Calculadora encontrada");
      return null;
    }

    const parsed = result.map(item => ({
      ...item,
      _id: item._id.toString()  // ⬅️ conversão crucial
    }));

    return parsed;

  } catch (error) {
    console.log(error, "Erro ao buscar dados na MongoDb");
    return null;
  }
}, [], { tags: "calculadoras" })


const getCalculadora = unstable_cache(async function getCalculadora(slug) {
  await connectToDatabase()

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const result = await Calculadora.findOne({ slug: slug })
      .populate({
        path: "calculadorasRelacionadas"
      })
      .lean();
    if (!result) {
      console.log("Nenhuma Calculadora encontrada")
      return null
    }

    // const parsed =
    // {
    //   ...result,
    //   _id: result._id.toString(),  // ⬅️ conversão crucial
    //   calculadorasRelacionadas: result.calculadorasRelacionadas.map((elem)=>{
    //     return (
    //       {...elem, _id:elem._id.toString(),calculadorasRelacionadas:[]}
    //     )
    //   })
    // }

    return result;

  } catch (error) {
    console.log(error, "Erro ao buscar dados na MongoDb")
    return null

  }
}, [], { tags: "calculadoras" })

export { createUserMongo, getUserMongo, updateBloco, updateReceituarioTransforma, handleArrayOfNotes, handleyArrayofArrayOfNotes, getCalculadoras, getCalculadora }