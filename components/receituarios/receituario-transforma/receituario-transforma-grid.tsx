'use client'

import { useState } from "react"
import TextoParaReceita from "./texto-para-receita"
import ReceitaParaTexto from "./receita-para-texto"

export default function RecTrasformaGrid() {

    const [display, setDisplay] = useState<1 | 2>(1)

    return (
        <div className="container mt-5 mt-lg-2">
            <div>
                <div className="d-inline">
                    <button type="button" className={`btn ${display === 1 ?"btn-secondary":"btn-outline-secondary"} mx-1`} onClick={()=>setDisplay(1)}>Texto p/ Receita</button>
                    <button type="button" className={`btn ${display === 2 ?"btn-secondary":"btn-outline-secondary"} mx-1`} onClick={()=>setDisplay(2)}>Receita p/ Texto</button>
                </div>
            </div>
            <div>
                {display === 1 && <TextoParaReceita />}
                {display === 2 && <ReceitaParaTexto />}

            </div>


        </div>

    )

}