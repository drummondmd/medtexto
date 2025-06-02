import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb"
import { notFound, redirect } from 'next/navigation'

export default async function UserNameRedirect({ params }) {
    ///geral
    const { userNameSlug } = await params;

    const user = await getUser(userNameSlug);
    if (!user) {
        notFound()
    }

    const userProfile = await getUserProfile(user.id)
    const userMongo = await getUserMongo(user.id);
    if (!userProfile || !userMongo) {
        notFound()
    }

    redirect(`/${userNameSlug}/${userProfile.homepage}`)
}