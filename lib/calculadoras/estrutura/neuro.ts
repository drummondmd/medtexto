import { CalculadoraEstrutura } from "./calcType";

const ecg: CalculadoraEstrutura =
{
    id: "67f43275599cb9587779a1bd",
    "titulo": "Escala de Coma de Glasgow",
    "descricao": "Avalia o nível de consciência com base em respostas oculares, verbais e motoras.",
    "instrucoes": "Projetado para uso em avaliações seriadas de pacientes em coma por causas médicas ou cirúrgicas por ser amplamente aplicável.",
    "entradas": [
        {
            "nome": "Abertura ocular",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Espontânea",
                    "value": 4,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Ao comando verbal",
                    "value": 3,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "À dor",
                    "value": 2,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Nenhuma",
                    "value": 1,
                    isDefault: false
                }
            ],
            tipo: ""
        },
        {
            "nome": "Resposta verbal",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Orientado",
                    "value": 5,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Confuso",
                    "value": 4,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Palavras inapropriadas",
                    "value": 3,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Sons incompreensíveis",
                    "value": 2,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Nenhuma",
                    "value": 1,
                    isDefault: false
                }
            ],
            tipo: ""
        },
        {
            "nome": "Resposta motora",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Obedece comandos",
                    "value": 6,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Localiza dor",
                    "value": 5,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Retirada à dor",
                    "value": 4,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Flexão anormal",
                    "value": 3,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Extensão anormal",
                    "value": 2,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Nenhuma resposta",
                    "value": 1,
                    isDefault: false
                }
            ],
            tipo: ""
        }
    ],
    "calculadorasRelacionadas": [],
    "evidencia": " Escala de Coma da Glasgow é calculado pela adição dos pontos totais selecionados em cada componente (olho, verbal, motor)",
    "referencias": [
        {
            "titulo": "Assessment of coma and impaired consciousness. A practical scale",
            "descricao": "Introdução da Escala de Coma de Glasgow.",
            "link": "https://pubmed.ncbi.nlm.nih.gov/4136544/",

        }
    ],
    "slug": "glasgow",
    "functionLogic": "glasgowComa"
}

export const neuro = [ecg]