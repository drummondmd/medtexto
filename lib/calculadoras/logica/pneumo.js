export function wellsTep(respostas) {
    let total = 0;

    for (const chave in respostas) {
        const valor = parseFloat(respostas[chave]);
        if (!isNaN(valor)) {
            total += valor;
        }
    }

    let classificacao = "";

    if (total <= 1.5) {
        classificacao = "Baixa probabilidade clínica de TEP";
    } else if (total <= 6) {
        classificacao = "Probabilidade clínica intermediária de TEP";
    } else {
        classificacao = "Alta probabilidade clínica de TEP";
    }

    return {
        "Wells - TEP": total + " ponto(s)",
        classificacao
    };
}

export function wellsTvp(data) {
    console.log(data)
    let score = 0;

    let valores = Object.values(data)

    valores.forEach((valor) => {
        if (valor.includes("-")) {

            score -= -valor

        } else {
            console.log(parseInt(valor))
            score += parseInt(valor);

        }

    })

    console.log(valores, score)


    let classificacao = "";

    if (score <= 0) {
        classificacao = "Baixa probabilidade";
    } else if (score <= 2) {
        classificacao = "Probabilidade moderada";
    } else {
        classificacao = "Alta probabilidade";
    }

    // ponto(s) (Alta probabilidade clínica de TEP)
    return {
        "Wells TVP": score + " ponto(s)",
        classificacao: classificacao + " clínica de TVP"
    };
}

export function calcularCurb65(data) {
    let score = 0;

    const valores  = Object.values(data)
    //pegando valores e trocando se resultado 1 vindo do curb.

    const valoresNormalizados = valores.map((valor)=>valor=="20"?"1":valor)

    valoresNormalizados.forEach(element => {
        score += parseInt(element)

    });

    let classificacao = "";

    if (score === 0 || score === 1) {
        classificacao = "Baixo risco – tratar ambulatorialmente";
    } else if (score === 2) {
        classificacao = "Risco intermediário – considerar internação";
    } else {
        classificacao = "Alto risco – considerar cuidados intensivos";
    }

    return {
        "CURB-65": score,
        classificacao
    };
}

export function calcularPsiPort(data) {
    let total = 0;

    const valores = Object.values(data);
    ///normalizando valores que vem da formula do curb
    const valoresNormalizados = valores.map((valor)=>valor =="1"?"20":valor)

    valoresNormalizados.forEach((valor)=>{
        if(valor.includes("-")){
            //não sei porque o negativo veio dessa vez e não veio da outra, então to somando normal.
            total += parseInt(valor)
        }else{
            total += parseInt(valor)
        }
    })



    let classificacao = "";

    if (total <= 50) {
        classificacao = "Classe I-II: Baixo risco – tratar ambulatorialmente";
    } else if (total <= 70) {
        classificacao = "Classe III: Risco moderado – considerar internação";
    } else if (total <= 90) {
        classificacao = "Classe IV: Alto risco – considerar hospitalização";
    } else {
        classificacao = "Classe V: Muito alto risco – considerar UTI";
    }

    return {
        "PSI/PORT": total,
        classificacao
    };
}

