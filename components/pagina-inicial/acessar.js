"use client";

import Link from "next/link";
import { useState } from "react";

export default function Acessar() {
  const [userInput, setUserInput] = useState("");

  // Estilos reutilizáveis (para consistência com os outros formulários)
  const inputClasses =
    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  // Usando sua cor customizada para o botão
  const buttonClasses =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mt-walnut hover:bg-mt-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500";

  return (
    <div className="space-y-4">
      {" "}
      {/* space-y-4 adiciona espaçamento vertical entre os elementos */}
      {/* Título */}
      <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
        Ou acesse sua conta Existente:
      </h3>
      {/* Campo de Input (Substitui div className="m-2") */}
      <div>
        <label htmlFor="acesso-username" className={labelClasses}>
          Username
        </label>
        <input
          id="acesso-username"
          type="text"
          className={inputClasses} // Substitui form-control
          onChange={(e) => setUserInput(e.target.value.toLowerCase())}
          placeholder="Digite seu usuário"
        />
      </div>
      {/* Botão de Acesso */}
      <Link href={`/${userInput}`} className="block">
        {" "}
        {/* block garante que o Link ocupe a largura total */}
        <button className={buttonClasses}>
          {" "}
          {/* Substitui btn btn-primary col-12 */}
          Ir até a página
        </button>
      </Link>
    </div>
  );
}
