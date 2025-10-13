'use client'

import { useEffect, useRef, useState } from "react"
import classes from "./bloco-de-notas.module.css";
import CopyButton from "./buttons/copy-to";
import SaveButton from "./buttons/save-to";
import { updateBloco } from "@/lib/databases/handler-mongodb";

//// depois ver outras formas de salvar, como após ultima mudança, ao clicar fora
export default function BlocoDeNotas({ user, inputDb }) {


    const [input, setInput] = useState(inputDb.conteudo)
    const textAreaRef = useRef(null)

    useEffect(() => {
        ajustarAltura();

    }, [input])

    function ajustarAltura() {
        const ta = textAreaRef.current;
        if (!ta) return;
        ta.style.height = 'auto';                       // limpa tamanho anterior
        ta.style.height = `${ta.scrollHeight}px`;       // ajusta à altura do conteúdo
    };


    function onChangeInput(e) {
        ajustarAltura()


        setInput(e.target.value)

    }

    function changeCase(whatCase) {
        ///fazer usestate para mudar aspecto depois


        if (whatCase === "upper") {
            let newInput = input.toUpperCase();
            setInput(newInput)
        } if (whatCase === "lower") {
            let newInput = input.toLowerCase();
            setInput(newInput)
        } if (whatCase === "first") {
            // let newInput = input.replace(input[0],input[0].toUpperCase())
            const array = input.split("\n");
            let arrayFirstUpperCase = []

            array.forEach((linha, index) => {
                if (linha.length > 1) {
                    arrayFirstUpperCase.push(linha.replace(linha[0], linha[0].toUpperCase()))
                } else {
                    arrayFirstUpperCase.push(linha)

                }

            })



            let newInput = arrayFirstUpperCase.join("\n")
            setInput(newInput)


        }




    }


    return (
        <div className="container my-3" onClick={() => updateBloco(user, input)}>
            <h6 className="display-6">Bloco de notas temporário</h6>

            <div className={`my-3 p-2 ${classes.control}`} onClick={(e) => e.stopPropagation()}>
                <div className="d-inline mx-2 p-2" onClick={() => changeCase("upper")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M660-263v-246l-57 57-51-51 144-144 144 144-51 51-57-57v246h-72Zm-516 0 162-432h78l162 432h-75l-38-110H258l-39 110h-75Zm136-172h130l-63-179h-4l-63 179Z" /></svg>
                </div>
                <div className="d-inline mx-2 p-2" onClick={() => changeCase("lower")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M322-263q-51 0-79.5-26.5T214-363q0-44 33-70.5t87-26.5q20 0 41 4t40 11v-9q0-30-20-48.5T342-521q-23 0-41 9t-33 28l-45-35q20-27 51.5-41.5T344-575q64 0 98.5 31.5T477-455v182h-62v-36h-3q-17 24-39 35t-51 11Zm11-53q34 0 58-23.5t24-56.5q-14-8-31.5-12t-37.5-4q-33 0-50 12.5T279-363q0 21 15 34t39 13Zm363 53L552-407l51-51 57 57v-246h72v246l57-57 51 51-144 144Z" /></svg>
                </div>
                <div className="d-inline mx-2 p-2" onClick={() => changeCase("first")}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M347-249v-360H229v-63h302v63H413v360h-66Zm337 9q-43.06 0-67.53-25.23Q592-290.47 592-335v-158h-52v-58h52v-85h65v85h73v58h-73v144.54Q657-326 667.28-313t27.91 13q8.81 0 17.81-3 9-3 18-9v63.16Q720-244 708.63-242q-11.37 2-24.63 2Z" /></svg>
                </div>
                <div className="d-inline mx-2 p-2" onClick={() => { setInput(""); updateBloco(user, "") }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </div>
                <CopyButton item={input} />
                <SaveButton user={user} input={input} path={"bloco"} />
            </div>
            <div className="my-3">

                <textarea ref={textAreaRef} spellCheck={"true"} name="temp" maxLength="45000" id=""
                    className={classes.notepad} value={input} onChange={onChangeInput}></textarea>

            </div>
        </div>
    )
}

