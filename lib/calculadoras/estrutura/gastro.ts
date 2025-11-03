import { CalculadoraEstrutura } from "./calcType";

const lille: CalculadoraEstrutura = {
  id: "6806b1c95dad8b596b79a1b8",
  titulo: "Escore de Lille",
  descricao: "Avalia resposta ao tratamento com corticoide na hepatite alcoólica grave.",
  instrucoes:
    "Use valores laboratoriais de bilirrubina antes e após 7 dias, albumina, creatinina e idade.",
  entradas: [
    {
      nome: "Idade",
      inputType: "input",
      tipo: "number",
      unidade: "anos",
      placeholder: "",
      obs: "",
      entradas: [],
    },
    {
      nome: "Albumina",
      inputType: "input",
      tipo: "number",
      unidade: "g/dL",
      placeholder: "",
      obs: "Valor no dia 0",
      entradas: [],
    },
    {
      nome: "Tempo de protrobina",
      inputType: "input",
      tipo: "number",
      unidade: "segundos",
      placeholder: "",
      obs: "Valor no dia 0",
      entradas: [],
    },
    {
      nome: "Creatinina",
      inputType: "input",
      tipo: "number",
      unidade: "mg/dL",
      placeholder: "",
      obs: "Valor no dia 0",
      entradas: [],
    },
    {
      nome: "Bilirrubina Dia 0",
      inputType: "input",
      tipo: "number",
      unidade: "mg/dL",
      placeholder: "",
      obs: "",
      entradas: [],
    },
    {
      nome: "Bilirrubina Dia 7",
      inputType: "input",
      tipo: "number",
      unidade: "mg/dL",
      placeholder: "",
      obs: "",
      entradas: [],
    },
  ],
  calculadorasRelacionadas: [{ id: "6806b1c95dad8b596b79a1b7" }],
  evidencia:
    "Pontuação do modelo de Lille = (exp(-R))/(1 + exp(-R))  onde as variáveis ​​são as seguintes:  R = 3,19 – 0,101*(idade, anos) + 0,147*(albumina dia 0, g/L) + 0,0165* (evolução do nível de bilirrubina, µmol/L) - 0,206*(insuficiência renal) - 0,0065*(bilirrubina dia 0, µmol/L) - 0,0096*(TP, seg)  Insuficiência renal = 1 (se Cr >1,3 mg/dL (115 µmol/L)) ou 0 (se ≤1,3 mg/dL (115 µmol/L))",
  referencias: [
    {
      titulo:
        "The Lille model: a new tool for therapeutic strategy in patients with severe alcoholic hepatitis treated with steroids",
      descricao: "Prognostic value of the Lille model in alcoholic hepatitis.",
      link: "https://pubmed.ncbi.nlm.nih.gov/17518367/",
    },
  ],
  slug: "lille",
  functionLogic: "calcularLille",
};

const childPug: CalculadoraEstrutura = {
  id: "6806b1c95dad8b596b79a1b6",
  titulo: "Child-Pugh",
  descricao: "Classifica a gravidade da cirrose hepática.",
  instrucoes: "Utilize os parâmetros clínicos e laboratoriais para estimar o escore Child-Pugh.",
  entradas: [
    {
      nome: "Bilirrubina",
      inputType: "input",
      tipo: "number",
      unidade: "mg/dL",
      obs: "",
      entradas: [],
    },
    {
      nome: "Albumina",
      inputType: "input",
      tipo: "number",
      unidade: "g/dL",
      obs: "",
      entradas: [],
    },
    {
      nome: "RNI",
      inputType: "input",
      tipo: "number",
      unidade: "",
      placeholder: "",
      obs: "",
      entradas: [],
    },
    {
      nome: "Ascite",
      inputType: "select",
      obs: "Leve: Detectada somente por US. Moderada: Detectável ao exame físico. ",
      entradas: [
        {
          tipo: "radio",
          nome: "Nenhuma",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Leve",
          value: 2,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Moderada",
          value: 3,
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "Encefalopatia hepática",
      inputType: "select",
      obs: "GI: Mudanças de comportamento, sem alteração em consciencia.GII: Desorientação grave, comportamento inadequado GIII: Confusão acentuada, alerta somente a estimulos GIV: Comatoso.",
      entradas: [
        {
          tipo: "radio",
          nome: "Nenhuma",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Grau I–II",
          value: 2,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Grau III–IV",
          value: 3,
          isDefault: false,
        },
      ],
      tipo: "",
    },
  ],
  calculadorasRelacionadas: [{ id: "67f43275599cb9587779a1be" }],
  evidencia: "Adição de pontos, conforme acima. ",
  referencias: [
    {
      titulo: "Surgery and portal hypertension",
      descricao: "Prognostic assessment of cirrhosis.",
      link: "https://pubmed.ncbi.nlm.nih.gov/4950264/",
    },
  ],
  slug: "child-pugh",
  functionLogic: "calcularChildPugh",
};

const meldNa: CalculadoraEstrutura = {
  id: "67f43275599cb9587779a1be",
  titulo: "Escore MELD-Na",
  descricao: "Quantifica a gravidade da doença hepática para priorização de transplante.",
  instrucoes: "Determina o prognóstico e prioriza o recebimento do transplante de fígado.",
  entradas: [
    {
      nome: "hd",
      displayNome: "Em dialise?",
      inputType: "select",
      obs: "Dialise realizada na última semana?",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: "true",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: "false",
          isDefault: true,
        },
      ],
      tipo: "",
    },
    {
      nome: "Creatinina",
      inputType: "input",
      tipo: "number",
      unidade: "mg/dL",
      obs: "",
      entradas: [],
    },
    {
      nome: "Bilirrubina",
      inputType: "input",
      tipo: "number",
      unidade: "mg/dL",
      obs: "",
      entradas: [],
    },
    {
      nome: "RNI",
      inputType: "input",
      tipo: "number",
      unidade: "",
      obs: "",
      entradas: [],
    },
    {
      nome: "Sódio",
      inputType: "input",
      tipo: "number",
      unidade: "mEq/L",
      obs: "",
      entradas: [],
    },
  ],
  calculadorasRelacionadas: [
    {
      id: "6806b1c95dad8b596b79a1b6",
    },
  ],
  evidencia: "Model for End-Stage Liver Disease with Sodium",
  referencias: [
    {
      titulo: "A model to predict survival in patients with end-stage liver disease",
      descricao: "Sistema de pontuação para priorização de transplantes hepáticos.",
      link: "https://pubmed.ncbi.nlm.nih.gov/11172350/",
    },
  ],
  slug: "meld-na",
  functionLogic: "meldNa",
};

const madrey: CalculadoraEstrutura = {
  id: "6806b1c95dad8b596b79a1b7",
  titulo: "Fórmula de Maddrey",
  descricao: "Prevê o prognóstico e o benefício dos esteroides na hepatite alcoólica.",
  instrucoes: "Utilize tempo de protrombina do paciente e controle, além da bilirrubina total.",
  entradas: [
    {
      nome: "Tempo de Protrombina",
      inputType: "input",
      tipo: "number",
      unidade: "segundos",
      placeholder: "",
      obs: "TP do paciente",
      entradas: [],
    },
    {
      nome: "Tempo de Protrombina Controle",
      inputType: "input",
      tipo: "",
    },
    {
      nome: "Tempo de Protrombina",
      inputType: "input",
      tipo: "number",
      unidade: "segundos",
      placeholder: "",
      obs: "TP do paciente",
      entradas: [],
    },
    {
      nome: "Tempo de Protrombina Controle",
      inputType: "input",
      tipo: "number",
      unidade: "segundos",
      placeholder: "VR: 11- 13",
      obs: "TP normal de referência",
      entradas: [],
    },
    {
      nome: "Bilirrubina",
      inputType: "input",
      tipo: "number",
      unidade: "mg/dL",
      placeholder: "",
      obs: "Bilirrubina total",
      entradas: [],
    },
  ],
  slug: "maddrey",
  functionLogic: "calcularMaddrey",
  evidencia: "",
  referencias: [],
  calculadorasRelacionadas: [],
};

export const gastro = [lille, childPug, meldNa, madrey];
