export function chadsVasc(itens) {

  const valores = Object.values(itens);

  let pontuacao = 0;

  valores.forEach((valor)=>pontuacao = pontuacao + Number(valor))

    let risco = "";

    if (pontuacao === 0) {
      risco = "Baixo risco";
    } else if (pontuacao === 1) {
      risco = "Risco intermediário";
    } else {
      risco = "Alto risco";
    }

    return {
        " CHA₂DS₂-VASc":pontuacao + " pontos",
        risco

    };
  }

  export function hasBled(respostas) {
    let score = 0;

    const campos = [
      'Hipertensão',
      'Função renal alterada',
      'Função hepática alterada',
      'ave',
      'Sangramento prévio ou predisposição',
      'INR lábil',
      'Idade >65 anos',
      'Uso de drogas ou álcool'
    ];

    campos.forEach((campo) => {
      const valor = parseInt(respostas[campo], 10);
      if (!isNaN(valor)) {
        score += valor;
      }
    });

    let classificacao = '';
    if (score >= 3) {
      classificacao = 'Maior risco de sangramento ≥3 pontos';
    } else {
      classificacao = 'Risco de sangramento considerado aceitável <3 pontos';
    }

    return {
      "HAS-BLED": score,
      classificacao
    };
  }

  export function heartScore(entradas) {
    const total = Object.values(entradas).reduce((acc, val) => acc + parseInt(val), 0);
    let classificacao = '';

    if (total <= 3) {
      classificacao = 'Baixo risco';
    } else if (total <= 6) {
      classificacao = 'Risco intermediário';
    } else {
      classificacao = 'Alto risco';
    }

    return {
      "Escore HEART": total,
      classificacao
    };
  }
