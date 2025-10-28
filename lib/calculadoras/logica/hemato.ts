export function ironDefictGanzoni({ peso, hbAtual, hbAlvo, ferroEstoque, estrategia }) {
    let deficit = peso
    deficit = deficit * (hbAlvo - hbAtual)
    deficit = deficit * 2.4
    deficit = deficit + +ferroEstoque

    let estrategiaResult = ""
    if(estrategia === "noripurum"){
        ///20mg/ml - 5ml/ampola
        const ml =  deficit / 20
        const ampolas = ml / 5
        estrategiaResult  = `${ml}ml - ${Math.round(ampolas)} ampolas  `

    }


    return {
        "Deficit": parseInt(deficit) + " mg",
        estrategiaResult
    };

  //   `
  //   // Fórmula de Ganzoni:
  //   // Déficit de ferro (mg) = peso (kg) × (Hb alvo - Hb atual) × 2.4 + ferro de reserva (mg)
  //   function calcularGanzoni({ peso, hbAtual, hbAlvo, ferroEstoque }) {
  //     const deficit = peso * (hbAlvo - hbAtual) * 2.4 + ferroEstoque;
  //     return deficit.toFixed(2);
  //   }
  // `
}