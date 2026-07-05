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

const news2: CalculadoraEstrutura = {
  id: "36af64b7-a7e6-409f-9954-d1a29ffcfbe3",
  titulo: "Sistema Nacional de Alerta Precoce (NEWS) 2",
  descricao:
    "Determina a gravidade da doença de um paciente e indica a necessidade de intervenção em cuidados intensivos (recomendado pelo NHS em detrimento do NEWS original).",
  instrucoes:
    "O Royal College of Physicians recomenda o NEWS2 nos seguintes contextos:1)Emergência: para avaliação inicial, monitoramento seriado e triagem.2) Enfermaria: para avaliação inicial de pacientes internados e monitoramento seriado.3)Pré-hospitalar: para comunicação da gravidade da doença aos hospitais de destino.",
  entradas: [
    {
      nome: "frequenciaRespiratoria",
      displayNome: "Frequência respiratória",
      inputType: "input",
      tipo: "number",
      unidade: "irpm",
      placeholder: "Ex: 18",
      obs: "Frequência respiratória em incursões por minuto.",
    },
    {
      nome: "spo2",
      displayNome: "Saturação de O₂",
      inputType: "input",
      tipo: "number",
      unidade: "%",
      placeholder: "Ex: 96",
      obs: "Saturação periférica de oxigênio.",
    },
    {
      nome: "escalaSpO2",
      displayNome: "Escala de saturação",
      inputType: "select",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Escala 1 (maioria dos pacientes)",
          value: "1",
          isDefault: true,
        },
        {
          tipo: "radio",
          nome: "Escala 2 (insuficiência respiratória hipercápnica)",
          value: "2",
          isDefault: false,
        },
      ],
      obs: "Utilize a Escala 2 apenas em pacientes com insuficiência respiratória hipercápnica (ex.: DPOC com retenção crônica de CO₂).",
    },
    {
      nome: "oxigenioSuplementar",
      displayNome: "Oxigênio suplementar",
      inputType: "select",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Não",
          value: "nao",
          isDefault: true,
        },
        {
          tipo: "radio",
          nome: "Sim",
          value: "sim",
          isDefault: false,
        },
      ],
    },
    {
      nome: "temperatura",
      displayNome: "Temperatura",
      inputType: "input",
      tipo: "number",
      unidade: "°C",
      placeholder: "Ex: 37,2",
      obs: "Temperatura corporal.",
    },
    {
      nome: "pressaoSistolica",
      displayNome: "Pressão arterial sistólica",
      inputType: "input",
      tipo: "number",
      unidade: "mmHg",
      placeholder: "Ex: 120",
      obs: "Pressão arterial sistólica.",
    },
    {
      nome: "frequenciaCardiaca",
      displayNome: "Frequência cardíaca",
      inputType: "input",
      tipo: "number",
      unidade: "bpm",
      placeholder: "Ex: 82",
      obs: "Frequência cardíaca em batimentos por minuto.",
    },
    {
      nome: "consciencia",
      displayNome: "Nível de consciência",
      inputType: "select",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Alerta",
          value: "alerta",
          isDefault: true,
        },
        {
          tipo: "radio",
          nome: "Confusão de início recente (ou desorientação/agitação), responde à voz, responde à dor ou não responde.",
          value: "avpu",
          isDefault: false,
        },
      ],
      obs: "AVPU ou confusão de início recente.",
    },
  ],
  evidencia: "Acesse o paper para melhor referencia",
  referencias: [
    {
      titulo: "News2(final report)",
      descricao: "Paper oficial de 2017",
      link: "https://www.rcp.ac.uk/media/a4ibkkbf/news2-final-report_0_0.pdf",
    },
  ],
  slug: "news2",
  functionLogic: "calcularNews2",
  calculadorasRelacionadas: [],
};

export const geral = [superficieCorporal, imc, pam, news2];
