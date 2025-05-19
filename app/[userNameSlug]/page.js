import {getUser} from "@/lib/databases/handler-pgdb"
import { notFound, redirect } from 'next/navigation'

export  default async function UserNameRedirect({params}){
    const {userNameSlug} = await params
    const userDetail = await getUser(userNameSlug)

    if (!userDetail) {
        notFound()
    }

    ///da mesma forma que usernot foud não está funcionando nas proximas paginas essa também não funciona

    /// if else, não funcionando se não chegar os dados
    ///e checagem de usuario não funcionando em paginas subsequentes

    if(userDetail.homepage === undefined || userDetail.homepage === null  ){
        redirect(`/${userNameSlug}/home`)
    }else{
        redirect(`/${userNameSlug}${userDetail.homepage}`)

    }


}