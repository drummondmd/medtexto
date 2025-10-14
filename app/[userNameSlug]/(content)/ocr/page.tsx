'use client'

import recToTexFunction from '@/actions/receituarios/rec-to-text-function';
import { useState } from 'react';
import { createWorker } from 'tesseract.js';


export default function Page() {

    const [file, setFile] = useState(null)
    const [result, setResult] = useState<string>("teste de resultado")
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const onSelectFile = (e) => {
        setFile(e.target.files[0])

    }

    const onSubmit = async (e) => {
        if (!file) {
            alert("Selecione arquivo");
            return
        }
        setResult('');
        setIsLoading(true)
        const route = e.target.value as "texto" | "receita"
        const worker = await createWorker('por');
        const ret = await worker.recognize(file);
        await worker.terminate();
        if (ret.data.confidence <= 75) {
            setResult("Texto não reconhecido ou imagem de baixa qualidade")
            setIsLoading(false)

        } else {
            if (route === "receita") {
                const transformed = await recToTexFunction(ret.data.text);
                if (transformed.success) {
                    setResult(transformed.output)
                } else {
                    setResult(ret.data.text)
                }

            } if (route === "texto") {
                setResult(ret.data.text)

            }
            setIsLoading(false)

        }




    }




    return (
        <div>
            <input type='file' onChange={onSelectFile} accept=".jpg, .png, .gif" />
            <input type='button' onClick={onSubmit} value={"receita"} />
            <input type='button' onClick={onSubmit} value={"texto"} />
            {isLoading && (<div>
                Carregando...

            </div>)}
            <p>{result}</p>
        </div>

    )

}