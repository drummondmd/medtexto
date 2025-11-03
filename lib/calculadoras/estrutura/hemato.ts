import { CalculadoraEstrutura } from "./calcType";

const defictFerro: CalculadoraEstrutura = {
  id: "a1a3bdef093899170a74",
  titulo: "Deficit Ferro (Fórmula de Ganzoni)",
  descricao:
    "Calcula o déficit total de ferro (em mg) necessário para reposição em pacientes com anemia ferropriva, considerando peso corporal, hemoglobina atual e alvo e de acordo com estrategia de reposição.",
  instrucoes:
    "Informe o peso corporal em kg, a hemoglobina atual e a hemoglobina alvo desejada. O resultado indicará o déficit total estimado de ferro (em mg) segundo a fórmula de Ganzoni.",
  entradas: [
    {
      nome: "peso",
      displayNome: "Peso corporal",
      inputType: "input",
      tipo: "number",
      unidade: "kg",
      placeholder: "Ex: 70",
      obs: "Peso corporal em quilogramas.",
    },
    {
      nome: "hbAtual",
      displayNome: "Hemoglobina atual",
      inputType: "input",
      tipo: "number",
      unidade: "g/dL",
      placeholder: "Ex: 9",
      obs: "Hemoglobina medida atualmente.",
    },
    {
      nome: "hbAlvo",
      displayNome: "Hemoglobina alvo",
      inputType: "input",
      tipo: "number",
      unidade: "g/dL",
      placeholder: "Ex: 15",
      obs: "Hemoglobina alvo desejada para o paciente.",
    },
    {
      nome: "ferroEstoque",
      displayNome: "Ferro de reserva",
      inputType: "select",
      tipo: "select",
      entradas: [
        { tipo: "radio", nome: "500 mg (padrão adulto)", value: "500", isDefault: true },
        { tipo: "radio", nome: "0 mg (sem reserva)", value: "0", isDefault: false },
      ],
      obs: "Quantidade padrão de ferro de reserva. Adultos geralmente usam 500 mg.",
    },
    {
      nome: "estrategia",
      displayNome: "Estratégia de reposição",
      inputType: "select",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Sacarato de óxido férrico(Noripurum)",
          value: "noripurum",
          isDefault: true,
        },
      ],
    },
  ],
  evidencia:
    "Fórmula de Ganzoni: déficit de ferro (mg) = peso (kg) × (Hb alvo - Hb atual) × 2,4 + ferro de reserva (mg).",
  referencias: [
    {
      titulo: "Ganzoni AM. Intravenous iron-dextran: therapeutic and experimental possibilities.",
      descricao: "Therapeutic use of IV iron dextran based on total iron deficit calculations.",
      link: "https://pubmed.ncbi.nlm.nih.gov/5413918/",
    },
  ],
  slug: "deficit-ferro",
  functionLogic: "ironDefictGanzoni",
  calculadorasRelacionadas: [],
};

export const hemato = [defictFerro];
