'use client'

import { useActionState, useState } from "react"

export default function CreateNota({ isCaderno, handlerForm, boolean, close, user, cadernos, recurso }) {

    const [state, formAction, isPending] = useActionState(handlerForm, null)
    const [inputNewCaderno, setInputNewCaderno] = useState(false)

    let emptyArray = false
    let newCadernoInput = <>
        <div className="form-group my-1">
            <label className="form-label">Nome do Caderno:</label>
            <input name="caderno" defaultValue={state ? state.payload.get("caderno") : null}  maxLength={30} className="form-control"></input>

        </div>
    </>
    let emptyArrayContent = <>Nenhum caderno encontrado até o momento,adicione o primeiro{newCadernoInput}</>
    if(!isCaderno){
        emptyArrayContent = null
    }

    if (cadernos) {
        if (cadernos.length === 0) {
            emptyArray = true

        } else {
            ////fazer select
        }
    }

    return (
        <div className="modalBackdrop" onClick={close}>
            <dialog className="modal-custom" open={boolean}>
                <div className="container" onClick={(e)=>e.stopPropagation()}>
                    <form action={formAction}>
                        <div className="text-end"> <button type="button" className="btn btn-outline-dark" onClick={close}>Fechar</button></div>
                        {isCaderno && !emptyArray ?
                            <div className="row my-2">
                                <div className="col-md-6">
                                    <label className="form-label">Adicionar caderno existente:</label>
                                    <select name="cadernoExistente" className="form-select">
                                        <option readOnly>Selecionar caderno...</option>
                                        {cadernos.map((elem)=>{
                                            return(
                                                <option key={elem["_id"]} value={elem["_id"]}>{elem.titulo}</option>
                                            )
                                        })}
                                        {/* {Map do array que será posteriormente selecionado} */}

                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>Ou adicionar novo caderno:</label>
                                    <div className="btn col-12 mt-2" role="buttom" onClick={() => setInputNewCaderno(true)}>Adicionar novo caderno</div>
                                </div>

                            </div> : emptyArrayContent}

                        {inputNewCaderno && newCadernoInput}

                        <input name="userId" value={user.id} readOnly hidden></input>
                        <input name="userName" value={user.username} readOnly hidden></input>
                        <div className="form-group">
                            <label className="form-label">Título</label>
                            <input name="titulo" defaultValue={state ? state.payload.get("titulo") : null} type="text" maxLength={30} className="form-control" required></input>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Conteudo</label>
                            <textarea name="conteudo" defaultValue={state ? state.payload.get("conteudo") : null} style={{ height: "260px" }} required className="form-control"></textarea>
                        </div>
                        <div className="my-4">
                            <div className="row">
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-primary col-12">{`Criar ${recurso}`}</button>
                                </div>
                                <div className="col-md-8">
                                    {isPending && <p>Enviando ...</p>}
                                    {state ? <p>{state.mensagem}</p> : null}
                                </div>

                            </div>
                        </div>


                    </form>

                </div>

            </dialog>
        </div>

    )
}