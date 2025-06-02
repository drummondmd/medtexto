import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb"
import { notFound, redirect } from "next/navigation";
import { statsLogin } from "@/lib/stats/stats-logins";
import MainLayout from "@/components/layout/layout";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth/options";

export async function generateMetadata({ params }) {

    const { userNameSlug } = await params;

    return {
        title: `${userNameSlug} | MedTexto`,
        description: "Facilitando o dia a dia do Médico e do estudante de Medicina.",
    }
}

export default async function UserLayout({ children, params }) {
    const { userNameSlug } = await params
    const user = await getUser(userNameSlug);
    if (!user) {
        notFound()
    }

    const userProfile = await getUserProfile(user.id)
    if (!userProfile) {
        notFound()
    }

    const isPasswordNeeded = userProfile.senha_desejada;
    const session = await getServerSession(options);

    if (!session || session.user.username != userNameSlug) {

        if (isPasswordNeeded) {
            ///redirecionar p/ login se senha desejada
            redirect(`/${userNameSlug}/auth/signin`);
        }
    }

    //login stats
    statsLogin(user);

    return (
        <MainLayout nome={`${userProfile.nome} ${userProfile.sobrenome}`} userNameSlug={userNameSlug} session={session}>
            {children}
        </MainLayout>
    )

}