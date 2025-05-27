'use client'

import Link from "next/link"
import { useState } from "react"

export default function Acessar() {
    const [userInput, setUserInput] = useState("")

    return (
        <div>
            <h3>Ou acesse sua conta Existente:</h3>
            <div className="m-2">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" onChange={(e) => setUserInput(e.target.value.toLowerCase())}></input>
            </div>
            <Link href={`/${userInput}`}><button className="btn btn-primary col-12">Ir até a página</button></Link>
        </div>
    )
}