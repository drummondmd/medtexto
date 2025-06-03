///funçoes essenciais
function replace(normalLength, posologia, cps) {
    let finalStatement = "Uso conforme indicado"
    let qNumber;
    let result = 30;
    let unitario = 1;

    let s = normalLength ? "" : "s";
    if (cps) {
        cps = cps.replace(/[^0-9]/g, "")
        if (cps == 1) {
            s = ""
        }

    }
    cps = cps ?? 1;
    let mult = parseInt(cps)

    const mid = { regEx: new RegExp("(MID|24\/24.*|1x|qd|sid)", "gi"), statement: `Tomar ${cps} comprimido${s} ao dia`, quantidade: (30 * mult), unitario: 1 };
    const bid = { regEx: new RegExp("(BID|12\/12.*|2x)", "gi"), statement: `Tomar ${cps} comprimido${s} de 12/12 horas`, quantidade: (60 * mult), unitario: 2 };
    const tid = { regEx: new RegExp("(TID|8\/8.*|3x)", "gi"), statement: `Tomar ${cps} comprimido${s} de 8/8 horas`, quantidade: (90 * mult), unitario: 3 };
    const qid = { regEx: new RegExp("(QID|6\/6.*|4x)", "gi"), statement: `Tomar ${cps} comprimido${s} de 6/6 horas`, quantidade: (180 * mult), unitario: 4 };
    const q_ = { regEx: new RegExp("q_.*", "gi") };

    if (mid.regEx.test(posologia)) { finalStatement = mid.statement; result = mid.quantidade; unitario = mid.unitario }
    else if (bid.regEx.test(posologia)) { finalStatement = bid.statement; result = bid.quantidade; unitario = bid.unitario }
    else if (tid.regEx.test(posologia)) { finalStatement = tid.statement; result = tid.quantidade; unitario = tid.unitario }
    else if (qid.regEx.test(posologia)) { finalStatement = qid.statement; result = qid.quantidade; unitario = qid.unitario }
    else if (q_.regEx.test(posologia)) {
        qNumber = posologia.replace(/[^0-9]/g, "");
        let cpsDia = 24 / qNumber;
        let statement = `Tomar ${cps} comprimido${s} de ${qNumber}/${qNumber} horas `
        finalStatement = statement;
        result = (cpsDia * mult * 30)
        unitario = cpsDia
    }

    return { posologia: finalStatement, quantidade: `${result} comprimidos/mês. `, unitario }
}

function calcQtn(cpsInput, posologiaInput, tempoInput) {

    cpsInput ?? 1;
    let cps = parseInt(cpsInput)

    let { unitario } = replace(true, posologiaInput, cpsInput.toString())

    let result = unitario
    let num = tempoInput.replace(/[^0-9]/g, "")
    let dma = tempoInput.replace(/[^a-z]/g, "")

    let isSingular = num == 1 ? true : false
    const reference = {
        undefined: { mult: 1, string: isSingular ? "dia" : "dias" },
        d: { mult: 1, string: isSingular ? "dia" : "dias" },
        s: { mult: 7, string: isSingular ? "semana" : "semanas" },
        m: { mult: 30, string: isSingular ? "mes" : "meses" },
        a: { mult: 365, string: isSingular ? "ano" : "anos" }
    }
    const { mult, string } = reference[dma];

    return (
        {
            total: `${(num * mult * result * cps)} comprimidos`,
            posologia: `,por ${num} ${string}`
        }
    )

}

function conditionalHyphen(med, dosagem) {
    const conditialLenght = med.length + dosagem.length
    let x = 55
    if (conditialLenght > x) {
        x = 150 - conditialLenght
    } else {
        x -= conditialLenght
    }
    return ("-").repeat(x)

}

function medName(med) {
    let outputMed = med.split("-").join(" ")
    return outputMed
}


export function textToRec(uso, text, prevArray) {

    if (text.length < 5) return { error: "Digite o medicamento corretamente" };/// retornar se string muito curta;

    //// split com o regEx, ;,| desde que virgula não esteja entre numeros usando lookbehhind e lookahead na virgula
    let arrayOfString = text.split(/(;|\||(?<!\d),(?!\d))/gi)

    arrayOfString = arrayOfString.filter((string) => string.length > 1);
    /// dividindo elementos do texto por espaço e excluindo espaços vazios
    let nulo = false;

    const splitedArray = arrayOfString.map((string) => {
        let splited = string.split(" ").filter((elem) => elem.trim() != "");
        if (splited.length < 3) { nulo = true }
        return splited
    });

    if (nulo) { return { error: "Faltam elementos" } }

    let replacedArray = [];

    if (uso === "MUC") {
        //maping and populating arrary 2
        splitedArray.forEach((elem) => {
            if (elem.length === 3) {
                replacedArray.push(
                    {
                        med: medName(elem[0]),
                        dosagem: elem[1],
                        qtn: replace(true, elem[2]).quantidade,
                        hyphen: conditionalHyphen(elem[0], elem[1]),
                        posologia: replace(true, elem[2]).posologia,
                        normalLength: true
                    }
                )

            } else if (elem.length === 4) {
                replacedArray.push(
                    {
                        med: medName(elem[0]),
                        dosagem: elem[1],
                        qtn: replace(false, elem[3], elem[2]).quantidade,
                        hyphen: conditionalHyphen(elem[0], elem[1]),
                        posologia: replace(false, elem[3], elem[2]).posologia,
                        normalLength: false
                    }
                )
            }
            else if (elem.length === 5) {
                replacedArray.push(
                    {
                        med: medName(elem[0]),
                        dosagem: elem[1],
                        qtn: replace(false, elem[4], elem[2]).quantidade,
                        hyphen: conditionalHyphen(elem[0], elem[1]),
                        posologia: replace(false, elem[4], elem[2]).posologia,
                        normalLength: false
                    }
                )
            }

            else {
                nulo = true
            }


        })


    }

    if (uso === "MUE") {

        //maping elements
        splitedArray.forEach((elem) => {
            //normal length
            if (elem.length === 4) {
                let { total, posologia: compPosologia } = calcQtn(1, elem[2], elem[3])
                replacedArray.push(
                    {
                        med: medName(elem[0]),
                        dosagem: elem[1],
                        qtn: total,
                        hyphen: conditionalHyphen(elem[0], elem[1]),
                        posologia: replace(true, elem[2]).posologia,
                        compPosologia: compPosologia,
                        normalLength: true
                    }
                )

            }
            //special length

            // let test  =  ['Clavulin', '500/125mg', '2cp', 'TID', '20d'];

            else if (elem.length === 5) {
                let { total, posologia: compPosologia } = calcQtn(elem[2], elem[3], elem[4])

                replacedArray.push({
                    med: medName(elem[0]),
                    dosagem: elem[1],
                    qtn: total,
                    hyphen: conditionalHyphen(elem[0], elem[1]),
                    posologia: replace(false, elem[3], elem[2]).posologia,
                    compPosologia: compPosologia,
                    normalLength: false
                })
            }
            else {
                nulo = true
            }


        }
        )

    }

    if (nulo) { return { error: "Faltam ou sobram elementos no texto" } }


    const newArray = [...prevArray, ...replacedArray]
    return newArray








    ///

    ///

    ///retornar array

}
