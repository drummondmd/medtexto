'use client'


import { useEffect, useState } from "react"
import CreateUserForm from "./form";
import Acessar from "./acessar";
import classes from "./criar-usuario.module.css"

export default function CriarUsuario() {
    const [userNameInput, setUserInput] = useState("");
    const [userDisponivel, setUserDisponivel] = useState(null)
    const [acessar, setAcessar] = useState(true)

    async function checkDb() {
        const res = await fetch(`/api/usuarios?query=${userNameInput}`)
        const response = await res.json()
        if (response === true) {
            setUserDisponivel(
                <div className={classes.erroUsuario}>
                    <p className="my-2 p-2">Usuario não disponível, ou usuario não permitido(usuarios só podem conter letras, números, underscore e pontos.)</p>
                </div>

            )
            setAcessar(true)
        } if (response === false) {
            setUserDisponivel(<div><p>Usuario Disponivel,complete cadastro abaixo.</p><CreateUserForm userName={userNameInput} /></div>)
            setAcessar(false)
        }
    }


    return (
        <div style={{ backgroundColor: "#9aa6b2" }} >
            <div className="container-lg">

                <div className="d-flex flex-column justify-content-center align-items-center min-vh-100"  >
                    <div className="m-lg-4 w-lg-50 p-4 border rounded bg-light">
                        <div className="align-self-center"><h2>Crie seu usuario:</h2></div>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input type="text" onChange={(e) => setUserInput(e.target.value.toLowerCase())} className="form-control" placeholder="Digite o usuario desejado..."></input>
                            <button type="button" className="my-3 btn btn-primary col-12" onClick={checkDb}>Checar se usuário disponivel</button>
                            {userDisponivel}
                            <hr></hr>

                        </div>
                        <div>
                            {acessar && <Acessar />}

                        </div>

                    </div>




                </div>

            </div>


        </div>

    )
}