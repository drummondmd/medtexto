import { ActiveJob } from "@/lib/external-apis/lab-shif-types";

export default function ResultadoLabContainer({
  active_job,
  addCpf,
  onDelete,
}: {
  active_job: ActiveJob;
  addCpf: (patient: any) => void;
  onDelete: (patient_id: string, deleteAll: boolean) => void;
}) {
  const patients = active_job.data;

  return (
    <section aria-labelledby="patients-results-heading" className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 id="patients-results-heading" className="text-xl font-semibold text-slate-900">
          Pacientes cadastrados
        </h3>
        <p className="text-sm text-slate-500">{patients.length} paciente(s) no processo</p>
      </div>

      {patients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center text-sm text-slate-600">
          Nenhum paciente ainda no registro.
        </div>
      ) : (
        <div className="grid gap-4">
          {patients.map((patient) => (
            <article
              key={patient.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-semibold text-slate-900">{patient.patient_name}</h4>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {patient.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-700">Registros:</span>{" "}
                      {patient.records}
                    </p>
                    <p>
                      <span className="font-medium text-slate-700">Progresso:</span>{" "}
                      {patient.patient_progress * 100}%
                    </p>
                    <button
                      type="button"
                      onClick={() => onDelete(patient.id, false)}
                      className="inline-flex items-center rounded-lg border border-slate-300 bg-red-50 px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                    >
                      Excluir paciente
                    </button>
                  </div>
                  {patient.records === 0 && (
                    <button
                      type="button"
                      onClick={() => addCpf(patient)}
                      className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                    >
                      Tentar por CPF
                    </button>
                  )}
                </div>

                <div className="w-full lg:max-w-2xl">
                  {patient.reqs.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      Nenhuma requisição cadastrada.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {patient.reqs.map((req) => (
                        <div
                          key={req.requisicao_id}
                          className="rounded-xl border border-slate-200 bg-slate-50/80 p-4"
                        >
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2 text-sm text-slate-600">
                              <p>
                                <span className="font-medium text-slate-700">Recebido:</span>{" "}
                                {req.recebido}
                              </p>
                              <p>
                                <span className="font-medium text-slate-700">Previsto:</span>{" "}
                                {req.previsao}
                              </p>
                              <p>
                                <span className="font-medium text-slate-700">1º resultado:</span>{" "}
                                {req.first_result}
                              </p>
                              <p>
                                <span className="font-medium text-slate-700">Flags:</span>{" "}
                                {req.has_flag}
                              </p>
                            </div>
                            <ul className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 text-sm">
                              {req.detalhado.map((item) => (
                                <li
                                  key={item.exame}
                                  className="flex items-center justify-between gap-3"
                                >
                                  <span className="font-medium text-slate-700">{item.exame}</span>
                                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                                    {item.status}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
