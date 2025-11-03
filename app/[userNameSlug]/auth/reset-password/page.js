import { notFound } from "next/navigation";

import { ResetPassForm } from "@/components/auth/reset-pass";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function ResetPass({ params }) {
  ///geral
  const { userNameSlug } = await params;

  const user = await getUser(userNameSlug);
  if (!user) {
    notFound();
  }

  const userProfile = await getUserProfile(user.id);
  const userMongo = await getUserMongo(user.id);
  if (!userProfile || !userMongo) {
    notFound();
  }

  return <ResetPassForm username={userNameSlug} userProfile={userProfile} />;
}
