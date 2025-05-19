import { getUser } from "@/lib/databases/handler-pgdb"
import { notFound, redirect } from "next/navigation";
import { statsLogin } from "@/lib/stats/stats-logins";
import MainLayout from "@/components/layout/layout";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth/options";




export async function generateMetadata({ params }) {

    const { userNameSlug } = await params;
    const userDetail = await getUser(userNameSlug);


    ///status de acessos

    if (!userDetail) {
        notFound()
    }

    return {
        title: `${userNameSlug} | MedTexto`,
        description: "Facilitando o dia a dia do Médico e do estudante de Medicina.",
    }
}

export default async function UserLayout({ children, params }) {
    const { userNameSlug } = await params
    const userDetail = await getUser(userNameSlug);

    if(!userDetail){
        notFound()
    }


    const isPasswordNeeded = userDetail.senha_desejada;
    const session = await getServerSession(options);

    if (!session || session.user.username != userNameSlug) {
        // Destrói a sessão no lado do servidor
        // res.setHeader("Set-Cookie", [
        //     `next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
        //     `next-auth.csrf-token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
        // ]);
        ///nenhuma session logada ou usuario logado diferente do solicitado.
        //  ver se precisa de senha
        if (isPasswordNeeded) {
            ///redirecionar p/ login se senha desejada
            redirect(`/${userNameSlug}/auth/signin`);
        }
    }


    //login status
    statsLogin(userDetail);

    // const antigo = <>
    //     <MainHeader nome={userDetail ? `${userDetail.nome} ${userDetail.sobrenome}` : ""} />
    //     {/* Definindo background manual, trocar depois */}
    //     <main className={classes.main}>
    //         <div className="row">
    //             <SideMenu userName={userNameSlug} />
    //             <div className='col-lg-10'>
    //                 {children}
    //             </div>
    //         </div>

    //     </main>

    //     {/* arrumar footer depois, atrapalhando conteudo */}
    //     <MainFooter />
    // </>


    return (
        <MainLayout nome={`${userDetail.nome} ${userDetail.sobrenome}`} userNameSlug={userNameSlug} session={session}>
            {children}
        </MainLayout>



    )

}