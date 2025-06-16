'use client'

import Link from "next/link";
import { useState } from "react";
import CreateNota from "../modal/create-nota";
import { createResumoForm } from "@/lib/form-action";
import { resumoHandle } from "@/lib/handler-action";

export default function MenuResumo({ cadernosJson, userNameSlug, userDetail }) {
    const userNameHref = `/${userNameSlug}/resumos/`
    let isContent = false
    let cadernos = JSON.parse(cadernosJson)
    if (cadernos.length > 0) {
        isContent = true
    }

    const [modal, setModal] = useState(false)


    return (
        <>
            {modal && <CreateNota recurso={"resumo"} isCaderno={true} cadernos={cadernos} handlerForm={createResumoForm} boolean={true} close={() => setModal(false)} user={userDetail} username={userNameSlug} />}
            <div className="my-2 btn btn-primary" role="buttom" onClick={() => setModal(true)}>
                Criar novo resumo
            </div>
            <ul className="list-group my-2" >
                {isContent ?
                    <>
                        <li className=" p-3 list-group-item"><Link className="link-dark link-underline-opacity-25 link-underline-opacity-75-hover" href={userNameHref}>Todas as notas</Link></li>
                        {cadernos.map((elem) => {
                            return (
                                <li className="list-group-item" key={elem["_id"]}>
                                    <div className="p-1 d-flex justify-content-between">
                                        <div className="d-inline-flex">
                                            <Link href={userNameHref + elem["_id"]} className="link-dark link-underline-opacity-25 link-underline-opacity-75-hover">
                                                {elem.titulo}
                                            </Link>
                                        </div>
                                        <div role="buttom" className=" btn d-flex" onClick={() => resumoHandle("caderno", "delete-caderno", "resumos", userDetail, elem._id,userNameSlug)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg>
                                        </div>
                                    </div>

                                </li>
                            )
                        })}

                    </> : <li style={{ listStyleType: "none" }}>Nenhum resumo inserido até o momento</li>}
            </ul >


        </>
    )
}