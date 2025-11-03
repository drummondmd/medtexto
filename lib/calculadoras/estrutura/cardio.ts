import { CalculadoraEstrutura } from "./calcType";

const hasBled: CalculadoraEstrutura = {
  id: "67f43275599cb9587779a1ba",
  titulo: "Escore HAS-BLED",
  descricao:
    "O HAS-BLED é utilizado para estimar o risco de sangramento maior em pacientes com fibrilação atrial, especialmente aqueles em uso de anticoagulantes. ",
  instrucoes:
    " Para usar o HAS-BLED, avalie fatores clínicos do paciente com fibrilação atrial, atribua 1 ponto para cada fator presente, some os pontos e interprete o risco de sangramento anual; ≥3 indica alto risco e necessidade de monitorização mais rigorosa",
  entradas: [
    {
      nome: "Hipertensão",
      inputType: "select",
      obs: "PA sistólica >160 mmHg",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: 0,
          isDefault: true,
        },
      ],
    },
    {
      nome: "Função renal alterada",
      inputType: "select",
      obs: "Diálise, transplante renal, creatinina ≥2,26 mg/dL",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: 0,
          isDefault: true,
        },
      ],
      tipo: "",
    },
    {
      nome: "Função hepática alterada",
      inputType: "select",
      obs: "Bilirrubina >2x o normal com AST/ALT/FA >3x o normal",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: 0,
          isDefault: true,
        },
      ],
      tipo: "",
    },
    {
      nome: "ave",
      displayNome: "AVC prévio",
      inputType: "select",
      obs: "História de AVC isquêmico ou hemorrágico",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: 0,
          isDefault: true,
        },
      ],
    },
    {
      nome: "Sangramento prévio ou predisposição",
      inputType: "select",
      obs: "Histórico de sangramentos maiores",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: 0,
          isDefault: true,
        },
      ],
    },
    {
      nome: "INR lábil",
      inputType: "select",
      obs: "INR fora da faixa terapêutica >40% do tempo",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: 0,
          isDefault: true,
        },
      ],
    },
    {
      nome: "Idade >65 anos",
      inputType: "select",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: 0,
          isDefault: true,
        },
      ],
    },
    {
      nome: "Uso de drogas ou álcool",
      inputType: "select",
      obs: "Uso concomitante de antiplaquetários, AINEs ou abuso de álcool",
      tipo: "select",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: 0,
          isDefault: true,
        },
      ],
    },
  ],
  calculadorasRelacionadas: [{ id: "67f42b60599cb9587779a1b9" }],
  evidencia:
    "O HAS-BLED é composto por sete itens: hipertensão, função renal ou hepática anormal, história de AVC, história ou predisposição a sangramento, INR lábil, idade ≥65 anos, uso concomitante de drogas ou álcool. Cada item vale 1 ponto; a soma final indica o risco de sangramento anual",
  referencias: [
    {
      titulo:
        "A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey",
      descricao:
        "A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in atrial fibrillation patients.",
      link: "https://pubmed.ncbi.nlm.nih.gov/20299623/",
    },
  ],
  slug: "has-bled",
  functionLogic: "hasBled",
};

const heartScore: CalculadoraEstrutura = {
  id: "67f43275599cb9587779a1bb",
  titulo: "Escore HEART",
  descricao:
    "Prevê risco de eventos cardíacos adversos graves em 6 semanas em pacientes com dor torácica.",
  instrucoes:
    "Uso em pacientes com ≥21 anos de idade apresentando sintomas sugestivos de SCA. Não utilizar se houver nova elevação do segmento ST ≥1 mm ou outras novas alterações no ECG, hipotensão, expectativa de vida inferior a 1 ano ou doença médica/cirúrgica/psiquiátrica não cardíaca determinada pelo médico como requerendo internação.",
  entradas: [
    {
      nome: "História clínica",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "Altamente suspeita",
          value: 2,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Moderadamente suspeita",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Pouco ou nada suspeita",
          value: 0,
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "ECG",
      inputType: "select",
      obs: "1 ponto: Sem desvio de ST, mas alterações como BRE, HVE e repolarização (por exemplo, digoxina); 2 pontos: Desvio de ST não devido a BRE, HVE ou digoxina.",
      entradas: [
        {
          tipo: "radio",
          nome: "Alteração do Seg.ST",
          value: 2,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Alterações inespecíficas",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Normal",
          value: 0,
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "Idade",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "≥ 65 anos",
          value: 2,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "45-64 anos",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "< 45 anos",
          value: 0,
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "Risco cardiovascular",
      inputType: "select",
      obs: "Fatores de risco: hipertensão, hipercolesterolemia, DM, obesidade (IMC > 30 kg/m²), tabagismo (atual ou cessação do tabagismo ≤ 3 meses), histórico familiar positivo (pai ou irmão com DCV antes dos 65 anos); doença aterosclerótica: IM prévio, ICP/CABG, AVC/AIT ou doença arterial periférica",
      entradas: [
        {
          tipo: "radio",
          nome: "≥ 3 fatores ou história de doença cardiovascular",
          value: 2,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "1 ou 2 fatores de risco",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Nenhum fator de risco conhecido",
          value: 0,
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "Troponina",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "≥ 3x o limite normal",
          value: 2,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "1-3x o limite normal",
          value: 1,
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "≤ LSN",
          value: 0,
          isDefault: false,
        },
      ],
      tipo: "",
    },
  ],
  calculadorasRelacionadas: [],
  evidencia:
    "A fórmula consiste em somar pontos (0, 1 ou 2) para cada um dos cinco componentes: História clínica, ECG, Idade, Fatores de risco e Troponina. O total varia de 0 a 10, sendo que quanto maior o valor, maior o risco de eventos cardíacos.",
  referencias: [
    {
      titulo: "Chest pain in the emergency room: value of the HEART score",
      descricao: "Research validating the HEART score to stratify patients with chest pain.",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2442661/",
    },
  ],
  slug: "heart",
  functionLogic: "heartScore",
};

const chadsVasc: CalculadoraEstrutura = {
  id: "67f42b60599cb9587779a1b9",
  titulo: "Score CHA₂DS₂-VA Sc",
  descricao: "Calcula o risco de AVC em pacientes com fibrilação atrial.",
  instrucoes: "Utilize para guiar a decisão sobre anticoagulação.",
  entradas: [
    {
      nome: "ic",
      displayNome: "Insuficiência cardíaca",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: "1",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: "0",
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "Hipertensão",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: "1",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: "0",
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "Idade",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "<65",
          value: "0",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "65-74",
          value: "1",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: ">75",
          value: "2",
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "diabetes",
      displayNome: "Diabetes mellitus",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: "1",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: "0",
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "ave",
      displayNome: "AVC ou AIT prévio",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: "2",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: "0",
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "vascular",
      displayNome: "Doença vascular",
      inputType: "select",
      obs: "Ex: infarto prévio, doença arterial periférica",
      entradas: [
        {
          tipo: "radio",
          nome: "Sim",
          value: "1",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Não",
          value: "0",
          isDefault: false,
        },
      ],
      tipo: "",
    },
    {
      nome: "Sexo",
      inputType: "select",
      obs: "",
      entradas: [
        {
          tipo: "radio",
          nome: "Feminino",
          value: "1",
          isDefault: false,
        },
        {
          tipo: "radio",
          nome: "Masculino",
          value: "0",
          isDefault: false,
        },
      ],
      tipo: "",
    },
  ],
  evidencia: "Score validado para estratificação de risco tromboembólico.",
  referencias: [
    {
      titulo: "Gender and contemporary risk of adverse events in atrial fibrillation",
      descricao: "Estudo validando o uso do CHA2DS2-VASc.",
      link: "https://pubmed.ncbi.nlm.nih.gov/39217497/",
    },
  ],
  slug: "cha2ds2-vasc",
  calculadorasRelacionadas: [{ id: "67f43275599cb9587779a1ba" }],
  functionLogic: "chadsVasc",
};

export const cardio = [hasBled, heartScore, chadsVasc];
