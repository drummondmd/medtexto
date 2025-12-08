"use client";

import { useActionState, useState } from "react";

import { createUserForm } from "@/lib/form-action";

// Função auxiliar para o estilo de erro/sucesso (mantendo a consistência)
function FeedbackMessage({ state }) {
  if (!state) return null;

  // Traduzindo classes.erroUsuario para Tailwind (usando o padrão de erro/sucesso)
  const isError = state.mensagem != null ? true : false;
  const baseClasses = "my-2 p-3 border rounded-md";
  const errorClasses = "bg-red-100 border-red-300 text-red-800";
  const successClasses = "bg-green-100 border-green-300 text-green-800";

  return (
    <div className={`${baseClasses} ${isError ? errorClasses : successClasses}`}>
      <p>{state.mensagem}</p>
    </div>
  );
}

export default function CreateUserForm({ userName }) {
  const [state, formAction, isPending] = useActionState(createUserForm, null);
  const [selectRadio, setSelectRadio] = useState("false");

  // Estilo de Input Reutilizável (para consistência)
  const inputClasses =
    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const buttonClasses =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mt-walnut hover:bg-mt-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6f481c]";

  return (
    // 1. Container Principal
    // container mt-4 -> max-w-4xl mx-auto mt-8 (mais explícito e centralizado)
    <div className="max-w-4xl mx-auto mt-8 p-4">
      {/* Indicador de Carregamento */}
      {isPending && <p className="text-center text-blue-600 font-semibold">Enviando...</p>}

      {/* Mensagens de Feedback (Erro/Sucesso) */}
      <FeedbackMessage state={state} />

      {/* 2. Formulário com Grid do Tailwind */}
      {/* row g-3 -> grid grid-cols-1 md:grid-cols-2 gap-4 */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" action={formAction}>
        {/* Username (col-md-12 -> col-span-2 para ocupar a linha toda) */}
        <div className="md:col-span-2">
          <label htmlFor="username" className={labelClasses}>
            Username
          </label>
          <input
            id="username"
            type="text"
            className={inputClasses}
            name="username"
            value={userName}
            readOnly
            required
          />
        </div>

        {/* Nome (col-md-6) */}
        <div>
          <label htmlFor="nome" className={labelClasses}>
            Nome
          </label>
          <input
            id="nome"
            type="text"
            className={inputClasses}
            name="nome"
            defaultValue={state ? state.payload.get("nome") : ""}
            required
          />
        </div>

        {/* Sobrenome (col-md-6) */}
        <div>
          <label htmlFor="sobrenome" className={labelClasses}>
            Sobrenome
          </label>
          <input
            id="sobrenome"
            type="text"
            className={inputClasses}
            name="sobrenome"
            defaultValue={state ? state.payload.get("sobrenome") : ""}
            required
          />
        </div>

        {/* Email (col-md-12 -> col-span-2) */}
        <div className="md:col-span-2">
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            name="email"
            defaultValue={state ? state.payload.get("email") : ""}
            required
          />
        </div>

        {/* Opção de Senha (col-md-6) */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Deseja Proteger com senha?</p>

          {/* Radio Button 1 */}
          <div className="flex items-center mb-2">
            <input
              id="senha-nao"
              type="radio"
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              value={"false"}
              checked={selectRadio === "false"}
              onChange={() => setSelectRadio("false")}
              name="senhaDesejada"
            />
            <label htmlFor="senha-nao" className="ml-2 block text-sm text-gray-900">
              Não será necessário
            </label>
          </div>

          {/* Radio Button 2 */}
          <div className="flex items-center">
            <input
              id="senha-sim"
              type="radio"
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              value={"true"}
              checked={selectRadio === "true"}
              onChange={() => setSelectRadio("true")}
              name="senhaDesejada"
            />
            <label htmlFor="senha-sim" className="ml-2 block text-sm text-gray-900">
              Sim
            </label>
          </div>
        </div>

        {/* Campos de Senha (col-md-12 -> col-span-2) */}

        <>
          <div className="md:col-span-2">
            <label htmlFor="senha" className={labelClasses}>
              Senha
            </label>
            <input
              id="senha"
              placeholder="Mínimo de 6 caracteres"
              type="password"
              className={inputClasses}
              name="senha"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="senhaConfirma" className={labelClasses}>
              Confirmar Senha
            </label>
            <input
              id="senhaConfirma"
              placeholder="Repita senha digitada acima"
              type="password"
              className={inputClasses}
              name="senhaConfirma"
              required
            />
          </div>
        </>

        {/* Botão de Submissão (col-12 -> col-span-2) */}
        <div className="md:col-span-2 mt-4">
          <button type="submit" className={buttonClasses}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
