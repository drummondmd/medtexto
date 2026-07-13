"use client";

import { useCallback, useEffect, useState } from "react";

import { ActiveJob } from "@/lib/external-apis/lab-shif-types";
import { addCpfOnPatient, getJob, postNames, deletePatient } from "@/lib/external-apis/lab-shift";

import HeaderLab from "./headerLab";
import ResultadoLabContainer from "./resultado-container";
import SearchPatient from "./search-container";

export default function LabContainer({ job_id }: { job_id: string }) {
  const [activeJob, setActiveJob] = useState<ActiveJob | null>(null);
  const [isloading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  const get_request = useCallback(
    async (isRestarting: boolean = false) => {
      setLoading(true);
      const api_response = await getJob(job_id, isRestarting);
      if (api_response == null) {
        setActiveJob(null);
        setLoading(false);
        alert("Opa, Aconteceu um erro aqui.");
      } else {
        const data = api_response.active_job as ActiveJob;
        setActiveJob(data);
        setLoading(false);
      }
    },
    [job_id]
  );

  async function onAddName(names: string) {
    setLoading(true);
    const post = await postNames(job_id, names);
    if (post == null) {
      setLoading(false);
      alert("Erro ao adicionar pacinte");
    } else {
      const data = post.active_job as ActiveJob;
      setActiveJob(data);
      setLoading(false);
    }
  }

  async function onAddCpf(patient_obj: any) {
    setLoading(true);
    const typed_cpf = prompt("Digite o cpf:");
    const response = await addCpfOnPatient(job_id, patient_obj, typed_cpf);
    if (response == null) {
      setLoading(false);
      alert("Erro ao realizar ação");
    } else {
      const data = response.active_job as ActiveJob;
      setActiveJob(data);
      setLoading(false);
    }
  }

  async function onDeletePatient(patient_id: string, deleteAll: boolean = false) {
    setLoading(true);
    const response = await deletePatient(job_id, patient_id, deleteAll);
    if (response == null) {
      setLoading(false);
      alert("Erro ao realizar ação");
    } else {
      const data = response.active_job as ActiveJob;
      setActiveJob(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch inicial com loading state, padrão documentado do React
    get_request();
  }, [get_request]);

  if (isloading || !activeJob) {
    return (
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm ring-1 ring-slate-100">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="mt-4 h-8 w-56 rounded bg-slate-200" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="h-20 rounded-xl bg-slate-100" />
            <div className="h-20 rounded-xl bg-slate-100" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <HeaderLab
        job={activeJob}
        expired={expired}
        setExpired={setExpired}
        onClick={get_request}
        onDelete={onDeletePatient}
      />
      {!expired ? (
        <div className="space-y-6">
          <SearchPatient onAddName={onAddName} />
          <ResultadoLabContainer
            active_job={activeJob}
            addCpf={onAddCpf}
            onDelete={onDeletePatient}
          />
        </div>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Trabalho expirado</h3>
          <p className="mt-2 text-sm text-slate-600">
            Clique no botão de reiniciar na parte superior para carregar o processo novamente.
          </p>
        </section>
      )}
    </main>
  );
}
