import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import SigninForm from "@/components/pagina-inicial/signin-form";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function SignIn({ params }) {
  ///geral
  const { userNameSlug } = await params;

  const user = await getUser(userNameSlug, null);
  if (!user) {
    notFound();
  }

  const userProfile = await getUserProfile(user.id);
  const userMongo = await getUserMongo(user.id);
  if (!userProfile || !userMongo) {
    notFound();
  }

  ///especifico
  const session = await getServerSession();

  if (session && session.user.name == userNameSlug) {
    redirect(`/${userNameSlug}`);
  }

  return <SigninForm userNameSlug={userNameSlug} />;
}
