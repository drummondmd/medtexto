"use client";

import { BookText } from "lucide-react";
import { useState } from "react";

import cortiDesamameFunction from "@/actions/receituarios/cortic-desma-function";
import TextAreaWControlContainer from "@/components/shared/text-area-wControl/text-area-container";
import TitleHeader from "@/components/ui/titleHeader";

const entradas = [
  {
    tipo: "radio",
    nome: "hidrocortisona",
    displayNome: "Hidrocortisona",
    value: 20,
    isDefault: true,
  },
  { tipo: "radio", nome: "prednisona", displayNome: "Prednisona", value: 5, isDefault: false },
  { tipo: "radio", nome: "prednisolona", displayNome: "Prednisolona", value: 5, isDefault: false },
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
];

const referenciaDesmame = [
  "https://pubmed.ncbi.nlm.nih.gov/39874233/",
  "https://pmc.ncbi.nlm.nih.gov/articles/PMC11180513/",
  "https://pmc.ncbi.nlm.nih.gov/articles/PMC11180513/#dgae250-T4",
];

export default function Page() {
  const [inputs, setInputs] = useState<{ cort: string; dose: string; estra: string }>({
    cort: "",
    dose: "",
    estra: "",
  });
  const [result, setResult] = useState<string>("");

  const onClickDesmame = async () => {
    if (inputs.dose === "" || inputs.cort === "") {
      alert("Preencha um valor válido e selecione o corticoide usado");
      return;
    }
    let dose = +inputs.dose;
    if (inputs.cort != "5") {
      //prednisona é 5, converter se não
      const response = await fetch(`/api/calculadoras/calcularConversaoCorticoide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          corticoideOrigem: inputs.cort,
          doseOrigem: inputs.dose,
          corticoideDestino: 5,
        }),
      });
      const data = (await response.json()) as Object;
      const doseConvertida = Object.values(data)[0] as string;
      dose = Number(doseConvertida.match(/\d+/gi)[0]);
      if (dose < 5) {
        alert("Dose parece baixa, confira se está certo");
        return;
      }
    }
    const response = cortiDesamameFunction(dose);
    setResult(response.string);
  };

  return (
    <div className="container">
      <div className="mx-auto my-4 px-4">
        <TitleHeader title={"Desmame de Corticoide"} />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulário Principal */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm lg:p-6 border border-gray-200">
              <p className="text-gray-700 mb-4">
                Selecione o corticoide e a dose total diária em uso:
              </p>

              <div className="space-y-4">
                <select
                  value={inputs.cort}
                  onChange={(e) => setInputs({ ...inputs, cort: e.target.value })}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione o corticoide...</option>
                  {entradas.map((elem) => (
                    <option key={elem.nome} value={elem.value}>
                      {elem.displayNome}
                    </option>
                  ))}
                </select>

                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="number"
                    value={inputs.dose}
                    onChange={(e) => setInputs({ ...inputs, dose: e.target.value })}
                    placeholder="Dose diária"
                    className="flex-1 p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <button
                    onClick={onClickDesmame}
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Calcular Desmame
                  </button>
                </div>
              </div>
            </div>

            {/* Área do Resultado */}
            <div className="mt-6">
              <TextAreaWControlContainer
                userId={""}
                initialState={result}
                canMutateData={false}
                variant={"small"}
                resource={""}
                apiUpdateFunction={undefined}
                canOCR={false}
                key={result}
              />
            </div>
          </div>

          {/* Sidebar com Referências */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Referências</h2>
              <div className="space-y-3">
                {referenciaDesmame.map((referencia) => (
                  <a
                    key={referencia}
                    href={referencia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600">
                      <BookText size={20} />
                      <span className="text-sm">Ver artigo</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
