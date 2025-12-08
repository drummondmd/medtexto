import Acessar from "@/components/pagina-inicial/acessar";
import CreateUserForm from "@/components/pagina-inicial/form";

export default function Login({ input, setInput, response }) {
  return (
    <div className="flex flex-wrap h-full items-center">
      <div className="w-full max-w-5xl mx-4 lg:mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Crie seu usuario:</h2>
        {/* 3. Grupo do Formulário (usando div para agrupar) */}
        <div>
          <input
            id="username-input" // Adicionado htmlFor/id para acessibilidade
            type="text"
            onChange={(e) => setInput(e.target.value)}
            // 4. Estilo do Input com Tailwind
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Digite o nome de usuario desejado..."
            value={input}
          />

          {/* 6. Mensagens de Feedback */}
          {response?.response && (
            <div className="my-2 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md">
              <p>Usuário Disponível, complete o cadastro abaixo.</p>
              <CreateUserForm userName={input} />
            </div>
          )}
          {response?.response === false && (
            <div className="my-2 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md">
              <p>{response?.mensagem}</p>
            </div>
          )}

          <hr className="my-4" />
        </div>
        <div>{(response === null || response?.response === false) && <Acessar />}</div>
      </div>
    </div>
  );
}
