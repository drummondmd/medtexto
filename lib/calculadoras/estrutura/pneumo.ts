import { CalculadoraEstrutura } from "./calcType";

const curb65: CalculadoraEstrutura = {
    id: "67f432af599cb9587779a1c1",
    "titulo": "Escore de CURB-65",
    "descricao": "Estima a mortalidade da pneumonia adquirida na comunidade para ajudar a determinar o tratamento hospitalar versus ambulatorial.",
    "instrucoes": "A calculadora CURB-65 pode ser usada no pronto-socorro para estratificar o risco de pneumonia adquirida na comunidade de um paciente.",
    "entradas": [
        {
            "nome": "confusao",
            "displayNome": "Confusão mental",
            "inputType": "select",
            "tipo": "radio",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
        },
        {
            "nome": "Ureia > 50 mg/dL",
            "inputType": "select",
            "tipo": "radio",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
        },
        {
            "nome": "fr-30",
            "displayNome": "FR ≥30 irpm",
            "inputType": "select",
            "tipo": "radio",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
        },
        {
            "nome": "pas-90",
            "displayNome": "PAS <90 mmHg ou PAD ≤60 mmHg",
            "inputType": "select",
            "tipo": "radio",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
        },
        {
            "nome": "Idade ≥65 anos",
            "inputType": "select",
            "tipo": "radio",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
        }
    ],
    "calculadorasRelacionadas": [
        { id: "67f433ea599cb9587779a1cb" }
    ],
    "evidencia": "Adição dos pontos selecionados, como acima.",
    "referencias": [
        {
            "titulo": "Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study",
            "descricao": "British Thoracic Society guidelines",
            "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1746657/?tool=pmcentrez",
        }
    ],
    "slug": "curb-65",
    "functionLogic": "calcularCurb65"

}

const wellsTep: CalculadoraEstrutura =
{
    id: "67f43275599cb9587779a1bc",
    "titulo": "Critérios de Wells para TEP",
    "descricao": "Objetiva o risco de embolia pulmonar.\r\n\r\n",
    "instrucoes": "Avalie fatores clínicos de risco, some os pontos atribuídos a cada critério e estratifique a probabilidade de tromboembolismo pulmonar em baixa, moderada ou alta, ou em \"PE improvável\" e \"PE provável\" para orientar a investigação diagnóstica",
    "entradas": [
        {
            "nome": "tvp",
            "displayNome": "Sinais clínicos de TVP",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 3,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
            tipo: ""
        },
        {
            "nome": "fc",
            "displayNome": "Frequência cardíaca >100 bpm",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1.5,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
            tipo: ""
        },
        {
            "nome": "cirurgia",
            "displayNome": "Imobilização ou cirurgia recente",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1.5,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
            tipo: ""
        },
        {
            "nome": "tev-previo",
            "displayNome": "TEV prévio",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1.5,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
            tipo: ""
        },
        {
            "nome": "Hemoptise",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
            tipo: ""
        },
        {
            "nome": "cancer",
            "displayNome": "Câncer ativo",
            "inputType": "select",
            "obs": "",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 1,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ],
            tipo: ""
        }
    ],
    "calculadorasRelacionadas": [
        { id: "67f432af599cb9587779a1bf" }
    ],
    "evidencia": " • 0–1: baixa probabilidade • 2–6: moderada • >6: alta Ou: • 0–4: TEP improvável • >4: TEP provável",
    "referencias": [
        {
            "titulo": "Excluding pulmonary embolism at the bedside without diagnostic imaging: management of patients with suspected pulmonary embolism presenting to the emergency department by using a simple clinical model and d-dimer",
            "descricao": "Wells PS et al., Thromb Haemost. 2000",
            "link": "https://pubmed.ncbi.nlm.nih.gov/11453709/"
        }
    ],
    "slug": "wells-tep",
    "functionLogic": "wellsTep"
}

const psiPort: CalculadoraEstrutura =
{
    id: "67f433ea599cb9587779a1cb",
    "titulo": "Escore PSI/PORT",
    "descricao": "Estima mortalidade de pneumonia comunitária para orientar internação.",
    "instrucoes": "O escore PSI/PORT pode ser usado na clínica ou no pronto-socorro para estratificar o risco de pneumonia adquirida na comunidade de um paciente.",
    "entradas": [
        {
            "nome": "Idade",
            "inputType": "input",
            "tipo": "number",
            "unidade": "anos",
            "entradas": []
        },
        {
            "nome": "Sexo",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Masculino",
                    "value": 0,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Feminino",
                    "value": -10,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Residência em asilo",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Neoplasia ativa",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 30,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Histórico de Insuficiência hepática",
            "inputType": "select",
            "tipo": "radio",
            "obs": "ex: Cirrose",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 20,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Histórico de Insuficiência cardíaca congestiva",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Histórico de Doença cerebrovascular",
            "inputType": "select",
            "tipo": "radio",
            "obs": "ex: AVC, IAM",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Histórico de Doença renal",
            "inputType": "select",
            "tipo": "radio",
            "obs": "ex: DRC",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "confusao",
            "displayNome": "Alteração do estado mental",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 20,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "fr-30",
            "displayNome": "Frequência respiratória ≥30",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 20,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "pas-90",
            "displayNome": "PAS <90 mmHg",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 20,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Temperatura <35°C ou >40°C",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 15,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Pulso ≥125 bpm",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "pH arterial <7.35",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 30,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Ureia >30 mg/dL",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 20,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Sódio <130 mEq/L",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 20,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Glicose >250 mg/dL",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Hematócrito <30%",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "Derrame Pleural",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        },
        {
            "nome": "PO2 <60 mmHg ou SatO2 <90%",
            "inputType": "select",
            "tipo": "radio",
            "entradas": [
                {
                    "tipo": "radio",
                    "nome": "Sim",
                    "value": 10,
                    isDefault: false
                },
                {
                    "tipo": "radio",
                    "nome": "Não",
                    "value": 0,
                    isDefault: false
                }
            ]
        }
    ],
    "calculadorasRelacionadas": [
        { id: "67f432af599cb9587779a1c1" }
    ],
    "evidencia": "Adição de pontos selecionados, como acima.",
    "referencias": [
        {
            "titulo": "A Prediction Rule to Identify Low-Risk Patients with Community-Acquired Pneumonia",
            "descricao": "Estudo original sobre predição de mortalidade na pneumonia.",
            "link": "https://www.nejm.org/doi/10.1056/NEJM199701233360402?url_ver=Z39.88-2003&rfr_id=ori:rid:crossref.org&rfr_dat=cr_pub%20%200www.ncbi.nlm.nih.gov",
        }
    ],
    "slug": "psi-port",
    "functionLogic": "calcularPsiPort"
}

const wellsTvp:CalculadoraEstrutura =
{
    id: "67f432af599cb9587779a1bf",
  "titulo": "Escore de Wells para TVP",
  "descricao": "Avalia probabilidade clínica pré-teste de trombose venosa profunda.",
  "instrucoes": "Os Critérios de TVP de Wells podem ser utilizados em ambulatórios e na emergência. ",
  "entradas": [
    {
      "nome": "cancer",
      "displayNome": "Câncer ativo",
      "inputType": "select",
      "tipo": "radio",
      "obs": "",
      "entradas": [
        {
            "tipo": "radio",
            "nome": "Sim",
            "value": 1,
            isDefault: false
        },
        {
            "tipo": "radio",
            "nome": "Não",
            "value": 0,
            isDefault: false
        }
      ]
    },
    {
      "nome": "imobilizacao",
      "displayNome": "Paralisia ou imobilização de MMII",
      "inputType": "select",
      "tipo": "radio",
      "obs": "",
      "entradas": [
        {
            "tipo": "radio",
            "nome": "Sim",
            "value": 1,
            isDefault: false
        },
        {
            "tipo": "radio",
            "nome": "Não",
            "value": 0,
            isDefault: false
        }
      ]
    },
    {
      "nome": "cirurgia",
      "displayNome": "Repouso recente no leito por >3 dias ou cirurgia recente",
      "inputType": "select",
      "tipo": "radio",
      "obs": "",
      "entradas": [
        {
            "tipo": "radio",
            "nome": "Sim",
            "value": 1,
            isDefault: false
        },
        {
            "tipo": "radio",
            "nome": "Não",
            "value": 0,
            isDefault: false
        }
      ]
    },
    {
      "nome": "sensibilidade",
      "displayNome": "Aumento da sensibilidade ao longo do sistema venoso profundo",
      "inputType": "select",
      "tipo": "radio",
      "obs": "",
      "entradas": [
        {
            "tipo": "radio",
            "nome": "Sim",
            "value": 1,
            isDefault: false
        },
        {
            "tipo": "radio",
            "nome": "Não",
            "value": 0,
            isDefault: false
        }
      ]
    },
    {
      "nome": "edema-mmii",
      "displayNome": "Edema de todo membro",
      "inputType": "select",
      "tipo": "radio",
      "obs": "",
      "entradas": [
        {
            "tipo": "radio",
            "nome": "Sim",
            "value": 1,
            isDefault: false
        },
        {
            "tipo": "radio",
            "nome": "Não",
            "value": 0,
            isDefault: false
        }
      ]
    },
    {
      "nome": "edema-assimetrico",
      "displayNome": "Edema unilateral >3cm que perna contralateral",
      "inputType": "select",
      "tipo": "radio",
      "obs": "",
      "entradas": [
        {
            "tipo": "radio",
            "nome": "Sim",
            "value": 1,
            isDefault: false
        },
        {
            "tipo": "radio",
            "nome": "Não",
            "value": 0,
            isDefault: false
        }
      ]
    },
    {
        "nome": "cacifo",
        "displayNome": "Edema depressível (cacifo) maior na perna afetada(unilateral)",
        "inputType": "select",
        "obs": "",
        "entradas": [
            {
                "tipo": "radio",
                "nome": "Sim",
                "value": "1",
                isDefault: false
            },
            {
                "tipo": "radio",
                "nome": "Não",
                "value": "0",
                isDefault: false
            }
        ],
        tipo: ""
    },
    {
      "nome": "veias",
      "displayNome": "Veias colaterais superficiais não-varicosas",
      "inputType": "select",
      "tipo": "radio",
      "obs": "",
      "entradas": [
        {
            "tipo": "radio",
            "nome": "Sim",
            "value": 1,
            isDefault: false
        },
        {
            "tipo": "radio",
            "nome": "Não",
            "value": 0,
            isDefault: false
        }
      ]
    },
    {
        "nome": "tev-previo",
        "displayNome": "TEV prévio",
        "inputType": "select",
        "obs": "",
        "entradas": [
            {
                "tipo": "radio",
                "nome": "Sim",
                "value": 1.5,
                isDefault: false
            },
            {
                "tipo": "radio",
                "nome": "Não",
                "value": 0,
                isDefault: false
            }
        ],
        tipo: ""
    },
    {
      "nome": "outro-diagnostico",
      "displayNome": "Diagnóstico alternativo tão provável quanto TVP",
      "inputType": "select",
      "tipo": "radio",
      "obs": "Celulite, Tromboflebite superficial,alterações osteoarticulares,câimbras,reputura muscular ou tendínea, alterações linfáticas.",
      "entradas": [
        {
            "tipo": "radio",
            "nome": "Sim",
            "value": -2,
            isDefault: false
        },
        {
            "tipo": "radio",
            "nome": "Não",
            "value": 0,
            isDefault: false
        }
      ]
    }
  ],
  "calculadorasRelacionadas": [
    {id:  "67f43275599cb9587779a1bc"}
  ],
  "evidencia": "Critérios clínicos de Wells para TVP,Adição dos pontos selecionados.",
  "referencias": [
    {
      "titulo": "Evaluation of D-Dimer in the Diagnosis of Suspected Deep-Vein Thrombosis",
      "descricao": "Wells PS et al., Lancet 1997",
      "link": "https://www.nejm.org/doi/10.1056/NEJMoa023153?url_ver=Z39.88-2003"
    }
  ],
  "slug": "wells-tvp",
  "functionLogic": "wellsTvp"
}

export const pneumo = [psiPort,curb65,wellsTep,wellsTvp]