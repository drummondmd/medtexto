
export function calcularImc({Peso, Altura} ) {
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
      "IMC": imc.toFixed(2),
      classificacao,
    };
  }

export function pam({PAS,PAD}){
  if (!PAS || !PAD || PAS === 0 || PAD === 0 || PAD>PAS ) {
    return { erro: "Pressão sistolica e diastolica devem ser informadas corretamente." };
  }
  let calc1 = (PAS-PAD)/3
  let result = parseInt(PAD) + calc1

  return{
    "PAM": Math.round(result) + " mmHG"
  }

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

