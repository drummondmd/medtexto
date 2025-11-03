export function cockcroftGault({ Idade, Peso, Creatinina, Sexo }) {
  if (!Idade || !Peso || !Creatinina || !Sexo) return null;

  let crCl = ((140 - Idade) * Peso) / (72 * Creatinina);
  if (Sexo.toLowerCase() === "feminino") {
    crCl *= 0.85;
  }

  const string = "mL/min";

  return {
    "Cockcroft-Gault": crCl.toFixed(2) + " " + string,
  };
}

export function ckdEpi({ Creatinina, Idade, Sexo }) {
  if (!Creatinina || !Idade || !Sexo) return null;

  let A, B;

  const scr = parseFloat(Creatinina);
  const idade = parseInt(Idade);
  const sexo = Sexo.toLowerCase();

  if (sexo === "feminino") {
    A = 0.7;
    B = scr <= 0.7 ? -0.241 : -1.2;
  } else if (sexo === "masculino") {
    A = 0.9;
    B = scr <= 0.9 ? -0.302 : -1.2;
  } else {
    return null; // Sexo inválido
  }

  let tfge = 142 * Math.pow(scr / A, B) * Math.pow(0.9938, idade);
  if (sexo === "feminino") tfge *= 1.012;

  const valor = parseFloat(tfge.toFixed(2));
  const string = " mL/min/1.73m²";
  let classificacao = "";

  if (valor >= 90) classificacao = " Estágio 1";
  else if (valor >= 60) classificacao = "Estágio 2";
  else if (valor >= 45) classificacao = "Estágio 3a ";
  else if (valor >= 30) classificacao = "Estágio 3b ";
  else if (valor >= 15) classificacao = "Estágio 4";
  else classificacao = "Estágio 5";

  return {
    "CKD-EPI": valor + string,
    classificacao,
  };
}

export function calcularFena(data) {
  const naUrina = parseFloat(data["Sódio urinário"]);
  const naSerico = parseFloat(data["Sódio sérico"]);
  const crUrina = parseFloat(data["Creatinina urinária"]);
  const crSerica = parseFloat(data["Creatinina sérica"]);

  const resultado = ((naUrina * crSerica) / (naSerico * crUrina)) * 100;

  let classificacao = "";
  if (resultado < 1) {
    classificacao = "Sugere causa pré-renal";
  } else if (resultado > 2) {
    classificacao = "Sugere causa intrínseca (NTA,NIA, ...)";
  } else {
    classificacao = "Indeterminado ou transição entre pré-renal e causa intrínseca";
  }

  return {
    FENa: parseFloat(resultado.toFixed(2)) + " %",
    classificacao,
  };
}
