
import SigninForm from "@/components/pagina-inicial/signin-form";
import { getUser } from "@/lib/databases/handler-pgdb";
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation";


export default async function SignIn({params}){
    // const providers = await getProviders()

    const {userNameSlug} = await params
    const session = await  getServerSession()
    const userDetail = await getUser(userNameSlug);
    const isPasswordNeeded = userDetail.senha_desejada;

    if(!userDetail){
        notFound()
    }


    if(session&&session.user.username == userNameSlug || !isPasswordNeeded){
        redirect(`/${userNameSlug}`);
    }

    return(
        <SigninForm userNameSlug={userNameSlug} />
    )




}