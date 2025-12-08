import { notFound } from "next/navigation";

import { updateBloco } from "@/actions/CRUD/update/textArea-update";
import TextAreaWControlContainer from "@/components/shared/text-area-wControl/text-area-container";
import TitleHeader from "@/components/ui/titleHeader";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function BlocoDeNotaPage({ params }) {
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

  ////especifico.
  const blocosDeNotas = userMongo.blocosDeNotas;

  ///ocr desabilitado por ora até melhor diagramação

  return (
    <div className="">
      <TitleHeader title={"Bloco de Notas"} />
      <TextAreaWControlContainer
        resource="bloco-de-notas"
        userId={user.id}
        canOCR={false}
        initialState={blocosDeNotas}
        variant="large"
        canMutateData={true}
        apiUpdateFunction={updateBloco}
      />
    </div>
  );
}
