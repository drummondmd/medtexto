import { headers } from 'next/headers';
import { loginRegistrer } from '../databases/handler-pgdb';


export async function statsLogin(user) {

    ///detalhes de usuario
    const { username,id } = user;

    ///headers para pegar ip e depois geolocalização
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');

    // O IP geralmente está no primeiro valor
    const ip = forwardedFor?.split(',')[0]?.trim() || null;

    ///fazer geolocalização depois com auxilio de API externa
    const cidade = "Belo Horizonte";
    const estado = "Minas Gerais";


    try {
        loginRegistrer(username,id,cidade,estado)
        // await loginRegistrer(username,userId,cidade,estado)

    } catch (error) {
        consoele.log(error,"Erro ao incluir dados de login na database")

    }


    // await updateUltimoLogin(user)

}





