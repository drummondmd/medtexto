"use client";

import { useState } from "react";

import { createEvolucao } from "@/lib/form-action";

import CreateNota from "../modal/create-nota";
import ReceituarioControl from "../receituarios/receituario-control";
import ToolbarRecEv from "../receituarios/toolbar";

export default function EvolucoesGrid({ user, data }) {
  data = JSON.parse(data);
  let first = { conteudo: "Nenhum conteúdo até o momento" };
  let isContent = false;

  let notas = [];

  if (data.length > 0) {
    isContent = true;
    notas = data;
    first = data[0];
  }

  const [selected, setSelected] = useState(first);
  const [openModal, setModal] = useState(false);

  function changeEvolucao(event) {
    event.preventDefault();
    const choose = notas.find((elem) => elem["_id"] == event.target.id);
    setSelected(choose);
  }

  function changeText(e) {
    setSelected({
      ...selected,
      conteudo: e.target.value,
    });
  }

  return (
    <>
      {openModal && (
        <CreateNota
          recurso={"evolução"}
          isCaderno={null}
          handlerForm={createEvolucao}
          user={user}
          boolean={openModal}
          close={() => setModal(false)}
        />
      )}
      <div className="container">
        <ReceituarioControl
          selected={selected}
          clickHandler={changeEvolucao}
          cadernos={notas}
          newEntry={() => setModal(true)}
        />
        {isContent && <ToolbarRecEv resource={"evolucoes"} selected={selected} user={user} />}
        <div className="d-flex justify-content-center">
          <textarea
            maxLength="45000"
            style={{ height: "360px", width: "90%" }}
            className="form-control mt-1 d-flex "
            value={selected.conteudo}
            onChange={changeText}
          ></textarea>
        </div>
      </div>
    </>
  );
}
