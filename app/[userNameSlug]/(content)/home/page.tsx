import { notFound } from "next/navigation";

import TitleHeader from "@/components/ui/titleHeader";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function UserNamePage({ params }) {
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

  return (
    <div>
      <div>
        <TitleHeader title={"Home"} />
      </div>
      <div>
        <h3>
          Seja bem vindo(a) de volta,{" "}
          {userProfile ? `${userProfile.nome} ${userProfile.sobrenome}` : ""}
        </h3>
      </div>
    </div>
  );
}
