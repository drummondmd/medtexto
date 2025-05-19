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
        "Wells": total + " ponto(s)",
        classificacao
    };
}

export function wellsTvp(data) {
    let score = 0;

    for (const chave in data) {
        const valor = parseFloat(data[chave]);
        if (!isNaN(valor)) {
            score += valor;
        }
    }

    let classificacao = "";

    if (score <= 0) {
        classificacao = "Baixa probabilidade";
    } else if (score <= 2) {
        classificacao = "Probabilidade moderada";
    } else {
        classificacao = "Alta probabilidade";
    }

    return {
        "Wells TVP": score,
        classificacao
    };
}

export function calcularCurb65(data) {
    let score = 0;

    for (const chave in data) {
        const valor = parseInt(data[chave]);
        if (!isNaN(valor)) {
            score += valor;
        }
    }

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

    for (const chave in data) {
        const valor = parseFloat(data[chave]);
        if (!isNaN(valor)) {
            total += valor;
        }
    }

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

