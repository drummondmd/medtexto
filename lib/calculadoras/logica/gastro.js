export function meldNa(data) {
  let creatinina = parseFloat(data["Creatinina"]);
  let bilirrubina = parseFloat(data["Bilirrubina"]);
  let inr = parseFloat(data["RNI"]);
  let sodio = parseFloat(data["Sódio"]);
  const dialise = data["hd"] === "true";

  //     MELD-Na = MELD + 1.32 X (137 // X Na) [0,033 x MELD x (137-Na)].
  // MELD = 10 * [(0.957 * ln(Creatinina)) + (0.378 * ln(Bilirrubina)) + (1.12 * ln(INR))] + 6.43

  // Se a creatinina for maior que 4,0 mg/dL, use 4,0 na fórmula.
  // Se a bilirrubina ou INR forem menores que 1, use 1 na fórmula.
  // Se o paciente estiver em diálise, use a concentração de creatinina pré-diálise, se disponível, ou, em caso contrário, use 4,0 mg/dL.
  // Aplicar limites mínimos
  if (dialise) creatinina = 4.0;
  creatinina = Math.max(creatinina, 1);
  creatinina = Math.min(creatinina, 4);
  bilirrubina = Math.max(bilirrubina, 1);
  inr = Math.max(inr, 1);

  // Aplicar limites ao sódio
  sodio = Math.min(Math.max(sodio, 125), 137);

  // Calcular MELD
  // MELD = 10 * [(0.957 * ln(Creatinina)) + (0.378 * ln(Bilirrubina)) + (1.12 * ln(INR))] + 6.43

  let logSoma = 0.957 * Math.log(creatinina) + 0.378 * Math.log(bilirrubina) + 1.12 * Math.log(inr);
  logSoma = logSoma + 0.643;
  let meld = 10 * logSoma;
  meld = Math.round(meld);

  // Calcular MELD-Na
  // MELD-Na = MELD + 1.32 x (137 - Na) - [0.033 x MELD x (137 - Na)]
  const sodium137 = 137 - sodio;
  const segundaParte = 0.033 * meld * sodium137;
  let meldNa = meld + 1.32 * sodium137;
  meldNa = meldNa - segundaParte;

  ///se meld maior que 11 calcular meld sodio, se não mandar meld normal
  meldNa = meld > 11 ? meldNa : meld;

  const resultado = Math.round(meldNa);

  return {
    "MELD-Na": resultado + " pontos.",
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
  const inr = parseFloat(data["RNI"]);
  if (inr < 1.7) score += 1;
  else if (inr <= 2.3) score += 2;
  else score += 3;

  score = score + parseFloat(data["Ascite"]);

  score = score + parseFloat(data["Encefalopatia hepática"]);

  let classe = "";
  if (score <= 6) classe = "Classe A (leve)";
  else if (score <= 9) classe = "Classe B (moderada)";
  else classe = "Classe C (grave)";

  return {
    "Child-Pugh": score + " pontos",
    classificacao: classe,
  };
}

export function calcularMaddrey(data) {
  const tpPaciente = parseFloat(data["Tempo de Protrombina"]);
  const tpControle = parseFloat(data["Tempo de Protrombina Controle"]);
  const bilirrubina = parseFloat(data["Bilirrubina"]);

  const df = 4.6 * (tpPaciente - tpControle) + bilirrubina;

  const classificacao =
    df >= 32 ? "Prognóstico ruim (DF ≥ 32)" : "Prognóstico menos grave (DF < 32)";

  return {
    "Maddrey DF": df.toFixed(2),
    classificacao: classificacao,
  };
}

export function calcularLille(data) {
  ///calculo não da certo de jeito nenhum

  return { erro: "Erro ao realizar o calculo, tente novamente mais tarde" };

  const idade = parseFloat(data["Idade"]);
  const albumina = parseFloat(data["Albumina"]);
  const bil0 = parseFloat(data["Bilirrubina Dia 0"]);
  const bil7 = parseFloat(data["Bilirrubina Dia 7"]);
  let creatinina = parseFloat(data["Creatinina"]);
  const tp = parseFloat(data["Tempo de protrobina"]);

  ///Renal insufficiency = 1 (if Cr >1.3 mg/dL (115 µmol/L)) or 0 (if ≤1.3 mg/dL (115 µmol/L))
  creatinina = creatinina > 1.3 ? 1 : 0;

  // R = 3.19 – 0.101*(age, years)
  // + 0.147*(albumin day 0, g/L)
  // + 0.0165* (evolution in bilirubin level, µmol/L) - 0.206*(renal insufficiency) - 0.0065*(bilirubin day 0, µmol/L) - 0.0096*(PT, sec)

  const R =
    3.19 -
    0.101 * idade +
    0.147 * albumina +
    0.0165 * (bil7 - bil0) -
    0.206 * creatinina -
    0.0065 * bil0 -
    0.0096 * tp;

  const x = -R;

  const lille = Math.exp(-x) / (1 + Math.exp(-x));

  const classificacao = lille >= 0.45 ? "Má resposta ao corticoide" : "Boa resposta ao corticoide";

  return {
    Lille: lille.toFixed(3),
    classificacao: classificacao,
  };
}
