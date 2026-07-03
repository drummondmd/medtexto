"use client";

import { useState } from "react";

import ActionButton from "@/components/ui/actionBtn";

export default function SearchPatient({ onAddName }: { onAddName: (name: string) => void }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmedValue = input.trim();
    if (!trimmedValue) return;
    onAddName(trimmedValue);
  };

  return (
    <section
      aria-labelledby="add-patient-heading"
      className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm ring-1 ring-slate-100"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Adicionar paciente
          </p>
          <h3 id="add-patient-heading" className="mt-1 text-xl font-semibold text-slate-900">
            Adicione um novo paciente ao processo
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Informe o nome do paciente para incluir uma nova entrada no fluxo.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
          <label htmlFor="patient-name" className="sr-only">
            Nome do paciente
          </label>
          <input
            id="patient-name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Nome do paciente"
            aria-label="Nome do paciente"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
          />
          <ActionButton
            variant="yellow"
            disable={false}
            onClick={handleAdd}
            title="Adicionar paciente"
          />
        </div>
      </div>
    </section>
  );
}
