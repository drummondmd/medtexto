"use client";

import { useState } from "react";

import { createReceituario } from "@/lib/form-action";

import ReceituarioPadrao from "./receituario";
import ReceituarioControl from "./receituario-control";
import ToolbarRecEv from "./toolbar";
import CreateCaderno from "../modal/create-nota";

// className={` ${displayCalc.titulo === calc.titulo ? "btn-secondary" : "btn-outline-secondary"}

export default function ReceituarioGrid({ user, data }) {
  data = JSON.parse(data);

  let cadernos = [];
  // data = [{ _id: 1, titulo: "Teste de tamanho de Titulo, 20", conteudo: "Teste" }, { _id: 2, titulo: "ITU", conteudo: "Teste2" }]
  let first = { conteudo: "Nenhum conteúdo até o momento" };
  ///se caderno existente,usar dados e fazer parse do string.
  let isContent = false;

  if (data.length > 0) {
    isContent = true;
    cadernos = data;
    first = data[0];
  }

  const [selected, setSelected] = useState(first);
  const [openModal, setModal] = useState(false);

  ///trocar nota
  function changeReceituario(event) {
    event.preventDefault();
    const choose = cadernos.find((elem) => elem["_id"] == event.target.id);
    setSelected(choose);
  }

  //mudar texto
  function changeText(e) {
    setSelected({
      ...selected,
      conteudo: e.target.value,
    });
    // setSelected((prev)=>{

    // })

    // setSelected
    // {...selected,selected.conteudo:event.target.value})}
  }

  return (
    <div className="container">
      <h6>Receituários Padrão</h6>
      {openModal && (
        <CreateCaderno
          recurso={"receituario"}
          isCaderno={false}
          handlerForm={createReceituario}
          user={user}
          boolean={openModal}
          close={() => setModal(false)}
        />
      )}
      <ReceituarioControl
        clickHandler={changeReceituario}
        selected={selected}
        cadernos={cadernos}
        newEntry={() => setModal(true)}
      />
      {isContent && <ToolbarRecEv resource={"receituarios"} selected={selected} user={user} />}
      <ReceituarioPadrao changeText={changeText} user={user} selected={selected} />
    </div>
  );
}
