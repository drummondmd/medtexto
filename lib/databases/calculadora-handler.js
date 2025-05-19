////
const dataTest = [
  {
    "_id": 1,
    "titulo": "IMC",
    "descricao": "Calcula o Índice de Massa Corporal",
    "instrucoes": "Você deve usar a calculadora com cuidado em pacientes com grande massa muscular.",
    "entradas": [
      { "nome": "peso", "inputType": "input", "tipo": "number", "unidade": "kg", "placeholder": "", "obs": "" },
      { "nome": "altura", "inputType": "input", "tipo": "number", "unidade": "m", "placeholder": "", "obs": "" }
    ],
    "calculadorasRelacionadas": [
      {
        "_id": 2,
        "titulo": "CKD-EPI",
        "descricao": "Calcula a taxa de filtração glomerular estimada (TFGe).",
        "instrucoes": "Ajuste necessário para pacientes com extremos de idade ou peso.",
        "entradas": [
          { "nome": "Creatinina", "inputType": "input", "tipo": "number", "unidade": "mg/dL", "placeholder": "Normal 0,7-1", "obs": "Creatinina sérica" },
          { "nome": "Idade", "inputType": "input", "tipo": "number", "unidade": "anos", "placeholder": "", "obs": "" },
          { "nome": "Sexo", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Masculino" }, { "tipo": "radio", "nome": "Feminino" }], "obs": "Masculino/Feminino" },
          { "nome": "Raça", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Negro" }, { "tipo": "radio", "nome": "Não negro" }], "obs": "Negra ou não negra" }
        ],
        "calculadorasRelacionadas": ["imc"],
        "evidencia": "Fórmula CKD-EPI de 2009",
        "tags": ["Nefrologia"],
        "referencias": ["https://example.com/ckd-epi"],
        "link": "ckd-epi"
      },{
        "_id": 3,
        "titulo": "Child-Pugh",
        "descricao": "Classifica a gravidade da cirrose hepática.",
        "instrucoes": "Utilize com cautela em pacientes com condições que afetam bilirrubina ou albumina.",
        "entradas": [
          { "nome": "Bilirrubina", "inputType": "input", "tipo": "number", "unidade": "mg/dL", "placeholder": "", "obs": "" },
          { "nome": "Albumina", "inputType": "input", "tipo": "number", "unidade": "g/dL", "placeholder": "", "obs": "" },
          { "nome": "INR", "inputType": "input", "tipo": "number", "unidade": "", "placeholder": "", "obs": "Relação normalizada internacional" },
          { "nome": "Ascite", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Nenhuma", value: 1 }, { "tipo": "radio", "nome": "Leve", value: 2 }, { "tipo": "radio", "nome": "Moderada", value: 3 }], "obs": "" },
          { "nome": "Encefalopatia", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Nenhuma", value: 1 }, { "tipo": "radio", "nome": "Leve", value: 2 }, { "tipo": "radio", "nome": "Grave", value: 3 }], "obs": "" }
        ],
        "calculadorasRelacionadas": ["meld"],
        "evidencia": "Classificação de Child-Pugh",
        "tags": ["Hepatologia"],
        "referencias": ["https://example.com/child-pugh"],
        "link": "child-pugh"
      }
      ],
    "evidencia": "(peso) / (altura * altura)",
    "tags": ["Nutrição", "Endocrinologia"],
    "referencias": ["https://example.com/imc"],
    "link": "imc"
  },
  {
    "_id": 2,
    "titulo": "CKD-EPI",
    "descricao": "Calcula a taxa de filtração glomerular estimada (TFGe).",
    "instrucoes": "Ajuste necessário para pacientes com extremos de idade ou peso.",
    "entradas": [
      { "nome": "Creatinina", "inputType": "input", "tipo": "number", "unidade": "mg/dL", "placeholder": "Normal 0,7-1", "obs": "Creatinina sérica" },
      { "nome": "Idade", "inputType": "input", "tipo": "number", "unidade": "anos", "placeholder": "", "obs": "" },
      { "nome": "Sexo", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Masculino" }, { "tipo": "radio", "nome": "Feminino" }], "obs": "Masculino/Feminino" },
      { "nome": "Raça", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Negro" }, { "tipo": "radio", "nome": "Não negro" }], "obs": "Negra ou não negra" }
    ],
    "calculadorasRelacionadas": ["imc"],
    "evidencia": "Fórmula CKD-EPI de 2009",
    "tags": ["Nefrologia"],
    "referencias": ["https://example.com/ckd-epi"],
    "link": "ckd-epi"
  },
  {
    "_id": 3,
    "titulo": "Child-Pugh",
    "descricao": "Classifica a gravidade da cirrose hepática.",
    "instrucoes": "Utilize com cautela em pacientes com condições que afetam bilirrubina ou albumina.",
    "entradas": [
      { "nome": "Bilirrubina", "inputType": "input", "tipo": "number", "unidade": "mg/dL", "placeholder": "", "obs": "" },
      { "nome": "Albumina", "inputType": "input", "tipo": "number", "unidade": "g/dL", "placeholder": "", "obs": "" },
      { "nome": "INR", "inputType": "input", "tipo": "number", "unidade": "", "placeholder": "", "obs": "Relação normalizada internacional" },
      { "nome": "Ascite", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Nenhuma", value: 1 }, { "tipo": "radio", "nome": "Leve", value: 2 }, { "tipo": "radio", "nome": "Moderada", value: 3 }], "obs": "" },
      { "nome": "Encefalopatia", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Nenhuma", value: 1 }, { "tipo": "radio", "nome": "Leve", value: 2 }, { "tipo": "radio", "nome": "Grave", value: 3 }], "obs": "" }
    ],
    "calculadorasRelacionadas": ["meld"],
    "evidencia": "Classificação de Child-Pugh",
    "tags": ["Hepatologia"],
    "referencias": ["https://example.com/child-pugh"],
    "link": "child-pugh"
  },
  {
    "_id": 4,
    "titulo": "MELD",
    "descricao": "Calcula a pontuação MELD para prever mortalidade em doença hepática.",
    "instrucoes": "Usada principalmente para priorização de transplante hepático.",
    "entradas": [
      { "nome": "Bilirrubina", "inputType": "input", "tipo": "number", "unidade": "mg/dL", "placeholder": "", "obs": "" },
      { "nome": "Creatinina", "inputType": "input", "tipo": "number", "unidade": "mg/dL", "placeholder": "", "obs": "" },
      { "nome": "INR", "inputType": "input", "tipo": "number", "unidade": "", "placeholder": "", "obs": "Relação normalizada internacional" },
      { "nome": "Diálise", "inputType": "select", "entradas": [{ "tipo": "radio", "nome": "Sim" }, { "tipo": "radio", "nome": "Não" }], "obs": "" }
    ],
    "calculadorasRelacionadas": ["child-pugh"],
    "evidencia": "Fórmula MELD",
    "tags": ["Hepatologia"],
    "referencias": ["https://example.com/meld"],
    "link": "meld"
  }
]

////adiconar placeholder nas entradas

/////todas calculadoras
async function todasCalculadoras() {

  try {
    return dataTest
  } catch (error) {
    console.log(error);
    return null

  }

}

////calculadoras favoritas

///calculadora especifica

async function calculadoraEspecifica(calculadoraSlug) {
  try {
    let calcEscolhida = dataTest.filter((elem) => elem.link === calculadoraSlug)

    if (calcEscolhida.length === 0 || calcEscolhida.length > 1) {
      return null
    } else {
      return calcEscolhida[0]
    }


  } catch (error) {
    console.log(error)

  }

}

export { todasCalculadoras, calculadoraEspecifica }