"use client";

import { ActiveJob } from "@/lib/external-apis/lab-shif-types";
import { formatDateTime } from "@/lib/helpers/datas";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
  finished: "bg-sky-100 text-sky-700",
  aborted: "bg-rose-100 text-rose-700",
  empty: "bg-slate-100 text-slate-700",
};

const statusLabels: Record<string, string> = {
  pending: "Em andamento",
  completed: "Concluído",
  finished: "Finalizado",
  aborted: "Abortado",
  empty: "Vazio",
};

export default function HeaderLab({
  expired,
  setExpired,
  job,
  onClick,
  onDelete,
}: {
  expired: boolean;
  setExpired: any;
  job: ActiveJob;
  onClick: any;
  onDelete: any;
}) {
  const expiresAt = new Date(job.finished_at ?? job.updated_at);
  const now = new Date();

  if (expiresAt < now) {
    setExpired(true);
  }

  const statusClass = statusStyles[job.global_status] ?? statusStyles.empty;
  const translatedStatus = statusLabels[job.global_status] ?? job.global_status;

  return (
    <section
      aria-labelledby="lab-summary-heading"
      className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm ring-1 ring-slate-100"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Resumo do processo
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="lab-summary-heading" className="text-2xl font-semibold text-slate-900">
              Resultados de laboratório
            </h2>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusClass}`}
            >
              {translatedStatus}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onDelete("patient_id", true)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            >
              Reiniciar trabalho
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="min-w-[220px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Última atualização
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {formatDateTime(job.updated_at)}
            </p>
          </div>
          <div className="min-w-[220px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Pacientes em seguimento
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{job.data.length}</p>
          </div>
        </div>
      </div>

      {expired && (
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Trabalho expirado</p>
            <p className="mt-1 text-amber-700/80">
              Este processo já não está ativo. Reinicie para continuar a acompanhar os resultados.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onClick(true)}
            className="inline-flex items-center justify-center rounded-lg border border-amber-300 bg-white px-4 py-2 font-medium text-amber-700 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Reiniciar
          </button>
        </div>
      )}
    </section>
  );
}
