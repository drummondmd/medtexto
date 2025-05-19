'use client'

import { useState } from "react"
import CreateNota from "../modal/create-nota"
import ReceituarioControl from "../receituarios/receituario-control"
import { createEvolucao } from "@/lib/form-action"
import ToolbarRecEv from "../receituarios/toolbar"

export default function EvolucoesGrid({ user, data }) {


    let notas = [];
    // data = [{ _id: 1, titulo: "Masculina", conteudo: "Teste" }, { _id: 2, titulo: "Feminina", conteudo: "Teste2" }]
    let first = { conteudo: "Nenhum conteudo até o momento" }
    let isContent = false;

    if (data.length > 0) {
        isContent = true;
        notas = data.map((elem) => {
            return (
                {
                    titulo: elem.titulo,
                    conteudo: elem.conteudo,
                    _id: JSON.parse(elem["_id"])
                }
            )
        })
        first = data[0]
    }

    const [selected, setSelected] = useState(first)
    const [openModal, setModal] = useState(false)

    function changeEvolucao(event) {
        event.preventDefault();
        let choose = notas.find((elem) => elem["_id"] == (event.target.id))
        setSelected(choose)
    }

    function changeText(e) {
        setSelected({
            ...selected,
            conteudo: e.target.value
        })
    }


    return (
        <>
            {openModal && <CreateNota recurso={"evolução"} isCaderno={null} handlerForm={createEvolucao} user={user} boolean={openModal} close={() => setModal(false)} />}
            <div className="container">
                <ReceituarioControl selected={selected} clickHandler={changeEvolucao} cadernos={notas} newEntry={() => setModal(true)} />
                {isContent && <ToolbarRecEv resource={"evolucoes"} selected={selected} user={user} />}
                <div className="d-flex justify-content-center">
                    <textarea maxLength="45000" style={{ height: "360px", width: "90%" }} className="form-control mt-1 d-flex " value={selected.conteudo} onChange={changeText}></textarea>
                </div>
            </div>
        </>
    )
}