import { CalculadoraEstrutura } from "./calcType";

const superficieCorporal: CalculadoraEstrutura = {
  id: "67f98d493a2b1a6bc779a1b7",
  titulo: "Superfície Corporal",
  descricao:
    "Esta fórmula estima a área total da superfície externa de um indivíduo, auxiliando no cálculo de dosagens de medicamentos, como quimioterapia, e na medição do índice cardíaco.",
  instrucoes: "Utilizado para ajuste de doses de medicamentos e avaliação clínica.",
  entradas: [
    {
      nome: "Peso",
      inputType: "input",
      tipo: "number",
      unidade: "kg",
      placeholder: "",
      obs: "",
      entradas: [],
    },
    {
      nome: "Altura",
      inputType: "input",
      tipo: "number",
      unidade: "m",
      placeholder: "",
      obs: "",
      entradas: [],
    },
  ],
  calculadorasRelacionadas: [{ id: "67f98b193a2b1a6bc779a1b6" }],
  evidencia: "BSA = 0.007184 * Altura0.725 * Peso0.425",
  referencias: [
    {
      titulo:
        "A formula to estimate the approximate surface area if height and weight be known. 1916",
      descricao: "Fórmula clássica para estimativa de superfície corporal.",
      link: "https://pubmed.ncbi.nlm.nih.gov/2520314/",
    },
  ],
  slug: "superficie-corporal",
  functionLogic: "calcularSuperficieCorporal",
};

const imc: CalculadoraEstrutura = {
  id: "67f98b193a2b1a6bc779a1b6",
  titulo: "IMC",
  descricao: "Calcula o Índice de Massa Corporal.",
  instrucoes: "Use com cautela em pacientes com grande massa muscular.",
  entradas: [
    {
      nome: "Peso",
      inputType: "input",
      tipo: "number",
      unidade: "kg",
      placeholder: "",
      obs: "",
      entradas: [],
    },
    {
      nome: "Altura",
      inputType: "input",
      tipo: "number",
      unidade: "m",
      placeholder: "",
      obs: "",
      entradas: [],
    },
  ],
  evidencia: "(peso) / (altura * altura)",
  referencias: [
    {
      titulo:
        '"How much should I weigh?"--Quetelet\'s equation, upper weight limits, and BMI prime',
      descricao: "Padrões de classificação do IMC.",
      link: "https://pubmed.ncbi.nlm.nih.gov/16768059/",
    },
  ],
  slug: "imc",
  functionLogic: "calcularImc",
  calculadorasRelacionadas: [],
};

const pam: CalculadoraEstrutura = {
  id: "67f42b1e599cb9587779a1b8",
  titulo: "Pressão Arterial Média (PAM)",
  descricao: "Calcula a pressão arterial média com base na PA sistólica e diastólica.",
  instrucoes: "Útil para avaliação da perfusão tecidual, especialmente em pacientes críticos.",
  entradas: [
    {
      nome: "PAS",
      inputType: "input",
      tipo: "number",
      unidade: "mmHg",
      placeholder: "Pressão Arterial Sistólica",
      obs: "",
      entradas: [],
    },
    {
      nome: "PAD",
      inputType: "input",
      tipo: "number",
      unidade: "mmHg",
      placeholder: "Pressão Arterial Diastólica",
      obs: "",
      entradas: [],
    },
  ],
  evidencia: "PAM = PAD + 1/3 (PAS - PAD)",
  referencias: [
    {
      titulo: "Referência de cálculo de PAM",
      descricao: "Explicação do cálculo da pressão arterial média.",
      link: "",
    },
  ],
  slug: "pressao-arterial-media",
  calculadorasRelacionadas: [],
  functionLogic: "pam",
};

export const geral = [superficieCorporal, imc, pam];
