import { getServerSession } from "next-auth";

import LabResultContainer from "@/components/features/lab-result/lab-result-container";
import { options } from "@/lib/auth/options";
import { getOrCreateJob } from "@/lib/external-apis/lab-shift";

const emailsAutenticados = [
  "marcelod.drummond@gmail.com",
  "marceloll2@yahoo.com.br",
  "marceloll2.md@gmail.com",
];

export default async function LabPage({ params }) {
  // teste de sessão, retirar depois
  let session = await getServerSession(options);
  session = true; ///temp retirar em prod

  if (!session || emailsAutenticados.includes(session?.user?.email)) {
    return <p>Não autenticado</p>;
  }

  //Sem necessidade de outras requisições no momento
  const { userNameSlug } = await params;

  const job_id = await getOrCreateJob(userNameSlug);
  if (job_id == null) return <p>Erro ao buscar api</p>;

  return <LabResultContainer job_id={job_id} />;
}
