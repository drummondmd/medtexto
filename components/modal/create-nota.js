"use client";

import { useActionState, useState } from "react";

export default function CreateNota({ isCaderno, handlerForm, close, user, cadernos, recurso }) {
  const [state, formAction, isPending] = useActionState(handlerForm, null);
  const [inputNewCaderno, setInputNewCaderno] = useState(false);

  let emptyArray = false;
  const newCadernoInput = (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Caderno:</label>
      <input
        name="caderno"
        defaultValue={state ? state.payload.get("caderno") : ""}
        maxLength={30}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  let emptyArrayContent = isCaderno ? (
    <div className="text-sm text-gray-600">Nenhum caderno encontrado até o momento, adicione o primeiro{newCadernoInput}</div>
  ) : null;

  if (cadernos) {
    if (cadernos.length === 0) emptyArray = true;
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/70 flex items-center justify-center z-50" onClick={close}>
      <div
        className="bg-gray-200 p-6 rounded-lg shadow-xl max-w-3xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <form action={formAction}>
          <div className="flex justify-end mb-3">
            <button type="button" className="text-sm px-3 py-1 rounded-md border border-gray-300" onClick={close}>
              Fechar
            </button>
          </div>

          {isCaderno && !emptyArray ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Adicionar caderno existente:</label>
                <select name="cadernoExistente" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Selecionar caderno...</option>
                  {cadernos.map((elem) => (
                    <option key={elem["_id"]} value={elem["_id"]}>
                      {elem.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ou adicionar novo caderno:</label>
                <button
                  type="button"
                  className="w-full rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setInputNewCaderno(true)}
                >
                  Adicionar novo caderno
                </button>
              </div>
            </div>
          ) : (
            emptyArrayContent
          )}

          {inputNewCaderno && newCadernoInput}

          <input name="userId" value={user.user_id} readOnly hidden />

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              name="titulo"
              defaultValue={state ? state.payload.get("titulo") : ""}
              type="text"
              maxLength={30}
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteudo</label>
            <textarea
              name="conteudo"
              defaultValue={state ? state.payload.get("conteudo") : ""}
              style={{ height: "260px" }}
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {`Criar ${recurso}`}
              </button>
            </div>
            <div className="flex-1 text-sm text-gray-700">
              {isPending && <p>Enviando ...</p>}
              {state ? <p>{state.mensagem}</p> : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
