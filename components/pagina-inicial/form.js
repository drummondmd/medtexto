'use client'

import { createUserForm } from "@/lib/form-action"
import { useActionState, useState } from "react"
import classes from "./criar-usuario.module.css"

export default function CreateUserForm({ userName }) {

    const [state, formAction, isPending] = useActionState(createUserForm, null)
    const [selectRadio, setSelectRadio] = useState(false)

    return (


        <div className="container mt-4">
            {isPending && (
                <p>Enviando</p>
            )}

            {state && (
                <div className={classes.erroUsuario}>
                    <p className="my-2 p-2">{state.mensagem}</p>

                </div>
            )}

            <form className="row g-3" action={formAction}>
                <div className="col-md-12">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={userName} readOnly required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name="nome" defaultValue={state ? state.payload.get("nome") : ""} />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" name="sobrenome" defaultValue={state ? state.payload.get("sobrenome") : ""} />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" defaultValue={state ? state.payload.get("email") : ""} />
                </div>

                <div className="col-md-6 ">
                    <p>Deseja Protejer com senha?</p>
                    <div className="form-check">
                        <label className="form-check-label">Não será necessario</label>
                        <input type="radio" className="form-check-input" value={selectRadio} checked={selectRadio === false} onChange={() => setSelectRadio(false)} name="senhaDesejada" />
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">Sim</label>
                        <input type="radio" className="form-check-input" value={selectRadio} checked={selectRadio === true} onChange={() => setSelectRadio(true)} name="senhaDesejada" />
                    </div>
                </div>
                {selectRadio &&
                    <>
                        <div className="col-md-12">
                            <label className="form-label">Senha</label>
                            <input placeholder="Mínimo de 6 caracteres" type="password" className="form-control" name="senha" required />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Confirmar Senha</label>
                            <input placeholder="Repita senha digitada acima" type="password" className="form-control" name="senhaConfirma" required   />
                        </div>
                    </>
                }



                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}
