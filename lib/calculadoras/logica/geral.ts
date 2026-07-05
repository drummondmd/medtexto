export function calcularImc({ Peso, Altura }) {
  if (!Peso || !Altura || Altura === 0) {
    return { erro: "Peso e altura devem ser informados corretamente." };
  }

  const imc = Peso / (Altura * Altura);
  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 24.9) {
    classificacao = "Peso normal";
  } else if (imc < 29.9) {
    classificacao = "Sobrepeso";
  } else if (imc < 34.9) {
    classificacao = "Obesidade grau I";
  } else if (imc < 39.9) {
    classificacao = "Obesidade grau II";
  } else {
    classificacao = "Obesidade grau III (mórbida)";
  }

  return {
    IMC: imc.toFixed(2),
    classificacao,
  };
}

export function pam({ PAS, PAD }) {
  if (!PAS || !PAD || PAS === 0 || PAD === 0 || PAD > PAS) {
    return { erro: "Pressão sistolica e diastolica devem ser informadas corretamente." };
  }
  const calc1 = (PAS - PAD) / 3;
  const result = parseInt(PAD) + calc1;

  return {
    PAM: Math.round(result) + " mmHG",
  };
}

export function calcularSuperficieCorporal(data) {
  const peso = parseFloat(data["Peso"]);
  const altura_metros = parseFloat(data["Altura"]); // agora em metros
  const altura_cm = altura_metros * 100;

  if (isNaN(peso) || isNaN(altura_cm)) {
    return { "Superfície Corporal": "Dados inválidos" };
  }

  const bsa = 0.007184 * Math.pow(peso, 0.425) * Math.pow(altura_cm, 0.725);

  return {
    "Superfície Corporal": parseFloat(bsa.toFixed(2)) + " (m²)",
  };
}

type News2Data = {
  frequenciaRespiratoria: string;
  spo2: string;
  escalaSpO2: "1" | "2";
  oxigenioSuplementar: "sim" | "nao";
  temperatura: string;
  pressaoSistolica: string;
  frequenciaCardiaca: string;
  consciencia: "alerta" | "avpu";
};

export function calcularNews2(data: News2Data) {
  //funcoes auxiliares

  function pontuarFR(fr: number) {
    if (fr <= 8) return 3;
    if (fr <= 11) return 1;
    if (fr <= 20) return 0;
    if (fr <= 24) return 2;

    return 3;
  }

  function pontuarSpo2(spo2: number, escala: "1" | "2", oxigenio: "sim" | "nao") {
    if (escala === "1") {
      if (spo2 <= 91) return 3;
      if (spo2 <= 93) return 2;
      if (spo2 <= 95) return 1;

      return 0;
    }

    // Escala 2

    if (oxigenio === "nao") {
      if (spo2 <= 83) return 3;
      if (spo2 <= 85) return 2;
      if (spo2 <= 87) return 1;

      return 0;
    }

    if (spo2 <= 83) return 3;
    if (spo2 <= 85) return 2;
    if (spo2 <= 87) return 1;
    if (spo2 <= 94) return 1;
    if (spo2 <= 96) return 2;

    return 3;
  }

  function pontuarOxigenio(oxigenio: "sim" | "nao") {
    return oxigenio === "sim" ? 2 : 0;
  }

  function pontuarTemperatura(temp: number) {
    if (temp <= 35) return 3;
    if (temp <= 36) return 1;
    if (temp <= 38) return 0;
    if (temp <= 39) return 1;

    return 2;
  }

  function pontuarPAS(pas: number) {
    if (pas <= 90) return 3;
    if (pas <= 100) return 2;
    if (pas <= 110) return 1;
    if (pas <= 219) return 0;

    return 3;
  }

  function pontuarFC(fc: number) {
    if (fc <= 40) return 3;
    if (fc <= 50) return 1;
    if (fc <= 90) return 0;
    if (fc <= 110) return 1;
    if (fc <= 130) return 2;

    return 3;
  }

  function pontuarConsciencia(consciencia: "alerta" | "avpu") {
    return consciencia === "alerta" ? 0 : 3;
  }

  //validação

  const camposObrigatorios = [
    "frequenciaRespiratoria",
    "spo2",
    "temperatura",
    "pressaoSistolica",
    "frequenciaCardiaca",
  ];

  for (const campo of camposObrigatorios) {
    if (!data[campo as keyof News2Data]) {
      return {
        Erro: `O campo "${campo}" é obrigatório.`,
      };
    }
  }

  const fr = Number(data.frequenciaRespiratoria);
  const spo2 = Number(data.spo2);
  const temp = Number(data.temperatura);
  const pas = Number(data.pressaoSistolica);
  const fc = Number(data.frequenciaCardiaca);

  if ([fr, spo2, temp, pas, fc].some(Number.isNaN)) {
    return {
      Erro: "Valores numéricos inválidos.",
    };
  }

  //calculo

  let total = 0;

  total += pontuarFR(fr);
  total += pontuarSpo2(spo2, data.escalaSpO2, data.oxigenioSuplementar);
  total += pontuarTemperatura(temp);
  total += pontuarPAS(pas);
  total += pontuarFC(fc);
  total += pontuarConsciencia(data.consciencia);
  total += pontuarOxigenio(data.oxigenioSuplementar);

  // ==========================
  // Classificação
  // ==========================

  let classificacao = "";
  let recomendacao = "";

  if (total <= 4) {
    classificacao = "Baixo risco";
    recomendacao = "Monitorização clínica de rotina.";
  } else if (total <= 6) {
    classificacao = "Risco intermediário";
    recomendacao = "Reavaliação frequente e considerar equipe de resposta rápida.";
  } else {
    classificacao = "Alto risco";
    recomendacao = "Avaliação médica imediata e considerar UTI.";
  }

  return {
    "NEWS-2": total + " pontos",
    Classificacao: classificacao,
    Recomendacao: recomendacao,
  };
}
