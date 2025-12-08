"use client";

import { useState } from "react";

import Acessar from "./acessar";
import CreateUserForm from "./form";

export default function CriarUsuario() {
  const [userNameInput, setUserInput] = useState("");
  const [userDisponivel, setUserDisponivel] = useState({ response: null, mensagem: "" });
  const [acessar, setAcessar] = useState(true);

  async function checkDb() {
    if (userNameInput.length < 2) {
      alert("Digite pelo menos 2 caracteres.");
      return;
    }
    const res = await fetch(`/api/usuarios?query=${userNameInput}`);
    const canIRegister = await res.json();
    if (!canIRegister.response) {
      setUserDisponivel({ mensagem: canIRegister.mensagem, response: false });
      setAcessar(true);
    }
    if (canIRegister.response) {
      setUserDisponivel({ ...userDisponivel, response: true });
      setAcessar(false);
    }
  }

  return (
    <div className="bg-mt-primary min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Crie seu usuario:</h2>
        {/* 3. Grupo do Formulário (usando div para agrupar) */}
        <div>
          <input
            id="username-input" // Adicionado htmlFor/id para acessibilidade
            type="text"
            onChange={(e) => {
              setUserInput(e.target.value.toLowerCase());
              setUserDisponivel({ response: null, mensagem: "" });
              setAcessar(true);
            }}
            // 4. Estilo do Input com Tailwind
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite o nome de usuario desejado..."
          />

          {/* 5. Estilo do Botão com Tailwind */}
          <button
            type="button"
            onClick={checkDb}
            className="my-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-mt-yellow  hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Checar se usuário disponível
          </button>

          {/* 6. Mensagens de Feedback */}
          {userDisponivel.response && (
            <div className="my-2 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md">
              <p>Usuário Disponível, complete o cadastro abaixo.</p>
              <CreateUserForm userName={userNameInput} />
            </div>
          )}
          {userDisponivel.response === false && (
            <div className="my-2 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md">
              <p>{userDisponivel.mensagem}</p>
            </div>
          )}

          <hr className="my-4" />
        </div>
        <div>{acessar && <Acessar />}</div>
      </div>
    </div>
  );
}
