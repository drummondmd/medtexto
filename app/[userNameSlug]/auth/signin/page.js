
import SigninForm from "@/components/pagina-inicial/signin-form";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation";


export default async function SignIn({ params }) {
    ///geral
    const { userNameSlug } = await params;

    const user = await getUser(userNameSlug);
    if (!user) {
        notFound()
    }

    const userProfile = await getUserProfile(user.id)
    const userMongo = await getUserMongo(user.id);
    if (!userProfile||!userMongo) {
        notFound()
    }

    ///especifico
    const session = await getServerSession()
    const isPasswordNeeded = userProfile.senha_desejada;



    if (session && session.user.username == userNameSlug || !isPasswordNeeded) {
        redirect(`/${userNameSlug}`);
    }

    return (
        <SigninForm userNameSlug={userNameSlug} />
    )




}