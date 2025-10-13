'use client'

import { textToRec } from "@/actions/receituarioTransforma"
import { useEffect, useState } from "react"

export default function TextoParaReceita() {

    ///mandar e pegar da db depois, talvez nem utilizar


    const [text, setText] = useState("")
    const [array, setArray] = useState([])
    const [rec, setRec] = useState("")
    const [error, setError] = useState(null)


    useEffect(() => {
        ///atualizar receituario ao atualizar array
        let string = ""

        array.forEach((element, index) => {
            if (element.compPosologia) {
                string = string + (index + 1) + ")" + element.med + " " + element.dosagem + " " + element.hyphen + " " + element.qtn + ".\n" + element.posologia + element.compPosologia + ".\n"
            } else {
                string = string + (index + 1) + ")" + element.med + " " + element.dosagem + " " + element.hyphen + " " + element.qtn + "\n" + element.posologia + ".\n"
            }
        })
        setRec(string)

    }, [array])


    function handleTextToRec(uso) {
        setError(null)
        try {
            const response = textToRec(uso, text, array);
            if (response.error) { setError(response.error) } else {
                setArray(response)

            };

        } catch (error) {
            console.log(error)
            setError("Erro ao processar requisição")

        }


    }


    return (
        <>
            <div className="container">
                <h6 className="my-2">Transformação de receituário</h6>
                <div className="my-2">
                    <textarea className="form-control" placeholder="ex:Losartana 50mg MID(MUC) ou Amoxicilina 500mg MID 7d(MUE) " value={text} onChange={(e) => setText(e.target.value)}></textarea>
                </div>
                {error ?? <div>{error}</div>}
                <div className="my-2">
                    <span className="border-end pe-2 me-2">Texto para receita</span>
                    <div className="d-inline">
                        <button type="button" className="btn btn-secondary mx-1" onClick={handleTextToRec.bind(null, "MUC")}>Uso continuo</button>
                        <button type="button" className="btn btn-secondary mx-1" onClick={handleTextToRec.bind(null, "MUE")}>Uso eventual</button>
                        <button type="button" className="btn btn-secondary mx-1" onClick={() => { navigator.clipboard.writeText(rec) }}>Copiar</button>
                        <button type="button" className="btn btn-secondary mx-1" onClick={() => { setArray([]);setRec("") }}>Apagar</button>
                    </div>
                </div>
                {/* Receituario para texto será feito depois */}
                {/* <div>
                    <span className="border-end pe-2 me-2">Receita para texto</span>
                    <div className="d-inline">Seletores</div>
                </div> */}
                <div className="my-2" ><textarea placeholder={`ex:1)Losartana 50mg ----------------- 30 comprimidos/mês.\nTomar 1 comprimido ao dia.
`} value={rec} onChange={(e) => setRec(e.target.value)} style={{ height: "260px" }} className="form-control"></textarea> </div>



            </div>




        </>
    )

}