export function glasgowComa(data) {
    const ocular = Number(data["Abertura ocular"]) || 0;
    const verbal = Number(data["Resposta verbal"]) || 0;
    const motora = Number(data["Resposta motora"]) || 0;

    const resultado = ocular + verbal + motora;

    return {
      "Escala Coma de Glasgow": resultado,
    };
  }
