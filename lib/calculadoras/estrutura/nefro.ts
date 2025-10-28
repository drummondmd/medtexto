import { CalculadoraEstrutura } from "./calcType"



const ckdEpi: CalculadoraEstrutura = {
    id: "67f42b1e599cb9587779a1b7",
    "titulo": "Equação CKD-EPI",
    "descricao": "Estima a taxa de filtração glomerular em pacientes com DRC.",
    "instrucoes": "Para usar a fórmula CKD-EPI, utilize creatinina sérica , idade, sexo e raça. A equação é indicada para adultos, com valores laboratoriais calibrados, e estima o ritmo de filtração glomerular em mL/min/1,73m²",
    "entradas": [
        {
            "nome": "Creatinina",
            "inputType": "input",
            "tipo": "number",
            "unidade": "mg/dL",
            "placeholder": "",
            "obs": "",
            "entradas": [],
        },
        {
            "nome": "Idade",
            "inputType": "input",
            "tipo": "number",
            "unidade": "anos",
            "placeholder": "",
            "obs": "",
            "entradas": [],
        },
        {
            "nome": "Sexo",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    isDefault:false,
                    "tipo": "radio",
                    "nome": "Masculino",
                    "value": "masculino",
                },
                {
                    isDefault:false,
                    "tipo": "radio",
                    "nome": "Feminino",
                    "value": "feminino",
                }
            ],
            tipo: undefined,
            unidade: undefined
        }
    ],
    "evidencia": "2021  CKD-EPI Creatinine = 142 × (Scr/A)B × 0.9938age × (1.012 if female)",
    "referencias": [
        {
            "titulo": "New Creatinine- and Cystatin C-Based Equations to Estimate GFR without Race",
            "descricao": "Artigo original da equação CKD-EPI.",
            "link": "https://pubmed.ncbi.nlm.nih.gov/34554658/",
        }
    ],
    "slug": "ckd-epi",
    "calculadorasRelacionadas": [
        { id: "67f42b1e599cb9587779a1b6" }
    ],
    "functionLogic": "ckdEpi"
}

const cockcroftGault: CalculadoraEstrutura =
{
    id: "67f42b1e599cb9587779a1b6",
    "titulo": "Cockcroft-Gault",
    "descricao": "Calcula a depuração de creatinina pela equação de Cockcroft-Gault.",
    "instrucoes": "Para usar a fórmula Cockcroft-Gault, utilize idade, peso, creatinina sérica e sexo para estimar a depuração de creatinina em adultos. Prefira peso ajustado se o paciente for obeso. Não é recomendada para crianças ou pacientes com função renal instável",
    "entradas": [
        {
            "nome": "Creatinina",
            "inputType": "input",
            "tipo": "number",
            "unidade": "mg/dL",
            "placeholder": "VR: 0,7-1,3mg/dL",
            "obs": "",
            "entradas": [],

        },
        {
            "nome": "Idade",
            "inputType": "input",
            "tipo": "number",
            "unidade": "anos",
            "placeholder": "",
            "obs": "",
            "entradas": [],

        },
        {
            "nome": "Peso",
            "inputType": "input",
            "tipo": "number",
            "unidade": "kg",
            "placeholder": "",
            "obs": "",
            "entradas": [],

        },
        {
            "nome": "Sexo",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Masculino",
                    "value": "masculino",
                    "isDefault": false,
                },
                {
                    "tipo": "radio",
                    "nome": "Feminino",
                    "value": "feminino",
                    "isDefault": false,
                }
            ],
            tipo: ""
        }
    ],
    "evidencia": "Cockcroft-Gault CrCl, mL/min = (140 – age) × (weight, kg) × (0.85 if female) / (72 × Cr, mg/dL)",
    "referencias": [
        {
            "titulo": "Prediction of creatinine clearance from serum creatinine",
            "descricao": "Estudo original sobre a fórmula de Cockcroft-Gault.",
            "link": "https://pubmed.ncbi.nlm.nih.gov/1244564/",
        }
    ],
    "slug": "cockcroft-gault",
    "calculadorasRelacionadas": [
        {id: "67f42b1e599cb9587779a1b7"}
    ],
    "functionLogic": "cockcroftGault"
}


export const nefro = [ckdEpi, cockcroftGault]