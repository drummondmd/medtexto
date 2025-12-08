import { notFound } from "next/navigation";

import ReceituarioGrid from "@/components/receituarios/receituario-grid";
import RecTrasformaGrid from "@/components/receituarios/receituario-transforma/receituario-transforma-grid";
import TitleHeader from "@/components/ui/titleHeader";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function Receituarios({ params }) {
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
  const receituarios = JSON.stringify(userMongo.receituarios);

  return (
    <div>
      <TitleHeader title={"Receituários"} />
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <ReceituarioGrid userId={user.id} data={receituarios} />
          <div className="block lg:hidden my-4">
            <hr />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <RecTrasformaGrid />
        </div>
      </div>
    </div>
  );
}
