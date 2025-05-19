'use client'

import { useState } from "react"
import classes from "./nota-detalhe.module.css"
import { resumoHandle } from "@/lib/handler-action"


export default function NotaDetalhe({ data,cadernoId,user}) {

    data = JSON.parse(data)

    const [nota,setNota] = useState(data)


    return (
        <>
            <div className="d-flex justify-content-end mb-2">
                <div role="buttom" className="btn btn-secondary mx-1" onClick={() => navigator.clipboard.writeText(nota.conteudo)}>Copiar</div>
                <div onClick={() => resumoHandle("note","delete", "resumos", user,cadernoId, nota)} role="buttom" className=" mx-1 btn btn-danger">Deletar</div>
                <div onClick={() => resumoHandle("note","update", "resumos", user,cadernoId, nota)} className="mx-1 btn btn-primary" role="buttom">Salvar</div>
            </div>
            {/* depois fazer com editor de texto slate */}
            {/* https://docs.slatejs.org/ */}
            <div className="m-2 p-2 ">
                <input className={`${classes.titulo} `} value={nota.titulo} onChange={(event)=>{setNota({...nota,titulo:event.target.value})}} />
            </div>
            <div className="m-2 p-2 ">
                <textarea maxLength="45000" className="form-control" style={{ minHeight: "400px" }} value={nota.conteudo} onChange={(event)=>{setNota({...nota,conteudo:event.target.value})}} />
            </div>

        </>

    )


}