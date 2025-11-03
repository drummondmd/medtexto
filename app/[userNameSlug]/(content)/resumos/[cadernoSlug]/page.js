import { notFound } from "next/navigation";

import NotasResumos from "@/components/resumos/notas";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function CadernoEspecifico({ params }) {
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

  ///especifico
  const { cadernoSlug } = await params;
  const resumos = userMongo.resumos;
  const cadernoEspecifico = resumos.find((elem) => elem["_id"] == cadernoSlug);

  if (!cadernoEspecifico) {
    notFound();
  }
  const notas = cadernoEspecifico.notas;
  const cadernoId = cadernoEspecifico["_id"];

  return (
    <>
      <div className="row">
        {notas.map((elem) => (
          <NotasResumos
            key={elem["_id"]}
            notaId={elem["_id"]}
            titulo={elem.titulo}
            cadernoId={cadernoId}
            conteudo={elem.conteudo}
            userNameSlug={userNameSlug}
          />
        ))}
      </div>
    </>
  );
}
