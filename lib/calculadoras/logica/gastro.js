export function meldNa(data) {
    console.log(data)
    let creatinina = parseFloat(data["Creatinina"]);
    let bilirrubina = parseFloat(data["Bilirrubina"]);
    let inr = parseFloat(data["INR"]);
    let sodio = parseFloat(data["Sódio"]);
    const dialise = data["Em dialise?"] === "true";

    // Aplicar limites mínimos
    if (dialise) creatinina = 4.0;
    creatinina = Math.max(creatinina, 1);
    bilirrubina = Math.max(bilirrubina, 1);
    inr = Math.max(inr, 1);

    // Aplicar limites ao sódio
    sodio = Math.min(Math.max(sodio, 125), 137);

    // Calcular MELD
    const meld =
      0.957 * Math.log(creatinina) +
      0.378 * Math.log(bilirrubina) +
      1.12 * Math.log(inr) +
      0.643;

    // Calcular MELD-Na
    const meldNa =
      meld + 1.32 * (137 - sodio) - 0.033 * meld * (137 - sodio);

    const resultado = Math.round(meldNa);

    return {
      "MELD-Na": resultado
    };
  }

  export function calcularChildPugh(data) {
    let score = 0;

    // Bilirrubina
    const bil = parseFloat(data["Bilirrubina"]);
    if (bil < 2) score += 1;
    else if (bil <= 3) score += 2;
    else score += 3;

    // Albumina
    const alb = parseFloat(data["Albumina"]);
    if (alb > 3.5) score += 1;
    else if (alb >= 2.8) score += 2;
    else score += 3;

    // INR
    const inr = parseFloat(data["INR"]);
    if (inr < 1.7) score += 1;
    else if (inr <= 2.3) score += 2;
    else score += 3;


    score = score + parseFloat(data["Ascite"])

    score = score + parseFloat(data['Encefalopatia hepática'])
    console.log(score)


    let classe = "";
    if (score <= 6) classe = "Classe A (leve)";
    else if (score <= 9) classe = "Classe B (moderada)";
    else classe = "Classe C (grave)";

    return {
      "Child-Pugh": score,
      "classificacao": classe
    };
  }

  export function calcularMaddrey(data) {
    const tpPaciente = parseFloat(data["Tempo de Protrombina"]);
    const tpControle = parseFloat(data["Tempo de Protrombina Controle"]);
    const bilirrubina = parseFloat(data["Bilirrubina"]);

    const df = 4.6 * (tpPaciente - tpControle) + bilirrubina;

    const classificacao = df >= 32 ? "Prognóstico ruim (DF ≥ 32)" : "Prognóstico menos grave (DF < 32)";

    return {
      "Maddrey DF": df.toFixed(2),
      "classificacao": classificacao
    };
  }

  export function calcularLille(data) {
    const idade = parseFloat(data["Idade"]);
    const albumina = parseFloat(data["Albumina"]);
    const bil0 = parseFloat(data["Bilirrubina Dia 0"]);
    const bil7 = parseFloat(data["Bilirrubina Dia 7"]);
    const creatinina = parseFloat(data["Creatinina"]);

    const deltaBilirrubina = (bil7 - bil0) / bil0;

    const R = 3.19
      - 0.101 * idade
      + 0.147 * albumina
      + 0.0165 * (bil7 - bil0)
      - 0.206 * deltaBilirrubina
      - 0.0065 * creatinina;

    const lille = 1 / (1 + Math.exp(-R));

    const classificacao = lille >= 0.45 ? "Má resposta ao corticoide" : "Boa resposta ao corticoide";

    return {
      "Lille": lille.toFixed(3),
      "classificacao": classificacao
    };
  }

