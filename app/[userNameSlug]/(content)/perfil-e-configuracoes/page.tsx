import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import ConfiguracoesGrid from "@/components/configuracoes/configuracoes-grid";
import { options } from "@/lib/auth/options";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function Preferencias({ params }) {
  ///geral
  const { userNameSlug } = await params;

  const user = await getUser(userNameSlug, undefined);
  if (!user) {
    notFound();
  }

  const userProfile = await getUserProfile(user.id);
  const userMongo = await getUserMongo(user.id);
  if (!userProfile || !userMongo) {
    notFound();
  }

  ///especifico

  const isSenhaDefinida = user.senha_hash ? true : false;

  ///por questões de segurança sempre exigir senha

  const session = await getServerSession(options);

  if (!session || session.user.username != userNameSlug) {
    redirect(`/${userNameSlug}/auth/signin`);
  }

  return (
    <ConfiguracoesGrid
      isSenhaDefinida={isSenhaDefinida}
      userNameSlug={userNameSlug}
      userDetail={userProfile}
    />
  );
}
