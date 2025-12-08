import { notFound } from "next/navigation";

import EvolucoesGrid from "@/components/evolucoes/evolucoes-grid";
import TitleHeader from "@/components/ui/titleHeader";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function Evolucoes({ params }) {
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

  const evolucoes = JSON.stringify(userMongo.evolucoes);

  return (
    <>
      <div className="container my-2">
        <TitleHeader title={"Evoluções"} />
        <EvolucoesGrid userId={user.id} data={evolucoes} />
      </div>
    </>
  );
}
