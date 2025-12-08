"use client";

import { useState } from "react";

import { deleteOfSelector } from "@/actions/CRUD/delete/selector-delete";
import { updateNoteOfArray } from "@/actions/CRUD/update/textArea-update";
import { NoteData } from "@/lib/databases/handler-mongodb";
import { createReceituario } from "@/lib/form-action";

import TextAreaWControlContainer from "../shared/text-area-wControl/text-area-container";
import ItemsToolbar from "../shared/toolbar/itemsToolbar";

export default function ReceituarioGrid({ userId, data }: { userId: string; data: string }) {
  const parsedJson = JSON.parse(data) as Array<NoteData>;
  let notas = [];
  let initalSelected = {
    label: "Crie sua primeiro receituario",
    titulo: "Crie sua primeira nota",
    _id: "sample",
    id: "sample",
    conteudo: "Nenhum conteúdo até o momento",
  };

  if (parsedJson.length > 0) {
    notas = parsedJson.map((nota) => ({
      id: nota._id,
      _id: nota._id,
      conteudo: nota.conteudo,
      label: nota.titulo,
      titulo: nota.titulo,
    }));
    initalSelected = notas[0];
  }

  const [selected, setSelected] = useState(initalSelected);

  function changeEvolucao([id]: Array<string>) {
    const choose = notas.find((elem) => elem["_id"] == id);
    setSelected(choose);
  }

  const onCopySelector = async (id) => {
    const choose = notas.find((elem) => elem["_id"] == id) as NoteData;
    navigator.clipboard.writeText(choose.conteudo);
  };

  const onDeleteSelector = async (id) => {
    const choose = notas.find((elem) => elem["_id"] == id) as NoteData;
    const clientResponse = confirm("Tem certeza que deseja deletar?");
    if (clientResponse) {
      ///deletar se confirmação
      const serverResponse = await deleteOfSelector("receituarios", userId, choose);
      if (serverResponse.success) {
        alert("Deletado!!!");
      } else {
        console.error("Erro ao deletar.");
      }
    }
  };

  return (
    <div className="container">
      <h6>Receituários Modelos</h6>
      <div>
        <ItemsToolbar
          handleForm={createReceituario}
          resource="receituarios"
          userId={userId}
          selectedIds={[selected._id]}
          arrayOfSelectors={notas}
          onCopy={onCopySelector}
          onClick={changeEvolucao}
          onDelete={onDeleteSelector}
        />
        <TextAreaWControlContainer
          key={selected.id}
          resource="receituarios"
          userId={userId}
          initialState={selected.conteudo}
          dataForArray={selected}
          canMutateData={true}
          variant={"small"}
          apiUpdateFunction={updateNoteOfArray}
          canOCR={false}
        />
      </div>
    </div>
  );
}
