import { notFound } from "next/navigation";

import MenuResumo from "@/components/resumos/menu-resumo";
import TitleHeader from "@/components/ui/titleHeader";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function ResumosLayout({ children, params }) {
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
  const resumos = JSON.stringify(userMongo.resumos);

  return (
    <div className="container">
      <TitleHeader title={"Resumos"} />
      <div className="row">
        <div className="col-md-3">
          <MenuResumo cadernosJson={resumos} userNameSlug={userNameSlug} userDetail={userProfile} />
        </div>
        <div className="col-md-9">{children}</div>
      </div>
    </div>
  );
}
