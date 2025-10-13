'use server'

const quantidadeReference = [/(\d+)\s*comprimido(?:s)?\/m[eê]s/i, /(\d+)\s*comprimido(?:\(s\)|s) de (\d+) mg/i, /(\d+)\s*comprimido(?:\(s\)|s)/i, /(\d+)\s*Unidade(?:\(s\)|s)/i]

const posologiaReference = {
    "MID":
        ["Tomar 1 comprimido ao dia", /(\d+)\s*Comprimido\(s\)\s*de\s*(\d+)\s*mg,\s*Uso Oral,\s*(1 vez à noite|1 vez pela manh(ã|a|á|ä)|1 vez ao dia)\s*, durante\s*(\d+)\s*dias/i, /tomar\s*1\s*(comprimido|cp)\s*(ao\s*dia|1x\/dia)/i, "1 vez pela manhã", "1 vez à noite"],
    "BID":
        ["Tomar 1 comprimido de 12/12 horas", /tomar\s*1\s*(comprimido|cp|cápsula )\s*(de\s*)?(12\/12|2x\/dia|duas\s*vezes\s*ao\s*dia)/i],
    "TID":
        ["Tomar 1 comprimido de 8/8 horas", /tomar\s*1\s*(comprimido|cp)\s*(de\s*)?(8\/8|3x\/dia|tr[eê]s\s*vezes\s*ao\s*dia)/i],
    "QID":
        ["Tomar 1 comprimido de 6/6 horas"]
}

const sobDemandaReference = ["em caso de necessidade"]


export default async function recToTexFunction(input: string): Promise<{ success: boolean, output?: string, message?: string }> {
    if (!input) return { success: false, message: "Insirá um valor" };
    const array = input.split(/\b\d+\)/gi).filter((elem) => elem != "");
    let outputString = "";


    const firstClean = array.map((elem, index) => {
        const transformed = elem
            .replace(/\n/g, '')
            .replace(/(\W)\1+/, '')

        return transformed


    });

    const quantidadeModifier = firstClean.map((elem) => {
        let transformed: string;
        for (const frase of quantidadeReference) {
            const regEx = typeof frase === "string" ? new RegExp(frase, "gi") : frase;
            if (regEx.test(elem)) {
                transformed = elem.replace(regEx, "");
                break;
            } else {
                transformed = elem
            }

        }

        return transformed




    })

    const posologiaModifier = quantidadeModifier.map((elem, index) => {
        for (const [codigo, frases] of Object.entries(posologiaReference)) {
            for (const frase of frases) {

                const regEx = typeof frase === "string" ? new RegExp(frase, "gi") : frase;
                if (regEx.test(elem)) {
                    return elem.replace(frase, codigo);
                }
            }
        }
        ///fazer um log posteriormente para acrescentar na base de dados depois.
        return elem;

    })

    const sobDemandaModifier = posologiaModifier.map((elem) => {
        for (const frase of sobDemandaReference) {
            const regEx = new RegExp(frase, "gi");
            if (regEx.test(elem)) {
                return elem.replace(frase, "SN");
            }
            return elem
            ///fazer um log posteriormente para acrescentar na base de dados depois.}
        }
    })

    const secondClean = sobDemandaModifier.map((elem) => {
        const transformed = elem
            .replace(/[;,.]+/g, " ")
            .replace(/\s+/g, " ")
            .replace(/(\d+)\s*Unidade\(s\)/i, '')
            .replace(/(\d+)\s*Comprimido\(s\)/i, '')
            .replace(/(comprimido|cápsula)/i, '')
            .replace(/(revestido)/i, '')
            .replace(/(uso oral)/gi, '')
            .replace(/(durante (\d+) dias)/i, '')
            .replace(/\s{2,}/i, ' ')
            .trim()

        return transformed

    })

    ///transformaçao para string
    secondClean.forEach((elem) => {
        outputString = outputString.length === 0 ? elem : outputString + " ; " + elem
    })

    ////qualityControl.
    //later


    ///se tudo der certo
    return { success: true, message: "Funcionte", output: outputString }

}

function testRecToFunction(input,outputString){

}