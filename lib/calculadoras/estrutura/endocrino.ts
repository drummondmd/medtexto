import { CalculadoraEstrutura } from "./calcType";

const calculadoraConversaoCorticoide: CalculadoraEstrutura = {
  id: "conversao-corticoides",
  titulo: "Conversão de Corticoides",
  descricao:
    "Calculadora para converter doses equivalentes de corticoides com base na potência glucocorticoide.",
  instrucoes:
    "Selecione o corticoide de origem e informe a dose em miligramas. A calculadora exibirá as doses equivalentes dos demais corticoides.",
  slug: "conversao-corticoides",
  functionLogic: "calcularConversaoCorticoide",
  evidencia:
    "Baseado em Goodman & Gilman, 13ª edição; UpToDate – Glucocorticoid Equivalents Table.",
  referencias: [
    {
      titulo:
        "Potency and duration of action of glucocorticoids. Effects of hydrocortisone, prednisone and dexamethasone on human pituitary-adrenal function",
      descricao: "Tabela de equivalência de corticosteroides sistêmicos.",
      link: "https://pubmed.ncbi.nlm.nih.gov/888843/",
    },
  ],
  entradas: [
    {
      nome: "corticoideOrigem",
      displayNome: "Converter de:",
      inputType: "select",
      tipo: "string",
      entradas: [
        {
          tipo: "radio",
          nome: "hidrocortisona",
          displayNome: "Hidrocortisona",
          value: 20,
          isDefault: true,
        },
        {
          tipo: "radio",
          nome: "prednisona",
          displayNome: "Prednisona",
          value: 5,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "prednisolona",
          displayNome: "Prednisolona",
          value: 5,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "metilprednisolona",
          displayNome: "Metilprednisolona",
          value: 4,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "dexametasona",
          displayNome: "Dexametasona",
          value: 0.75,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "betametasona",
          displayNome: "Betametasona",
          value: 0.6,
          isDefault: false,
        },
      ],
    },
    {
      nome: "doseOrigem",
      displayNome: "Dose informada (mg)",
      inputType: "input",
      tipo: "number",
      unidade: "mg",
      placeholder: "Ex: 10",
    },
    {
      nome: "corticoideDestino",
      displayNome: "Converter para:",
      inputType: "select",
      tipo: "string",
      entradas: [
        {
          tipo: "radio",
          nome: "hidrocortisona",
          displayNome: "Hidrocortisona",
          value: 20,
          isDefault: true,
        },
        {
          tipo: "radio",
          nome: "prednisona",
          displayNome: "Prednisona",
          value: 5,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "prednisolona",
          displayNome: "Prednisolona",
          value: 5,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "metilprednisolona",
          displayNome: "Metilprednisolona",
          value: 4,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "dexametasona",
          displayNome: "Dexametasona",
          value: 0.75,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "betametasona",
          displayNome: "Betametasona",
          value: 0.6,
          isDefault: false,
        },
      ],
    },
  ],
  calculadorasRelacionadas: [],
};

export const endocrino = [calculadoraConversaoCorticoide];
