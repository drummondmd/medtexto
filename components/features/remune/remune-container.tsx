"use client";

import { useState } from "react";

import retirarAcentos from "@/lib/helpers/retirarAcentos";

import RemuneControl from "./remune-control";
import RemuneDisplay from "./remune-display";

export type RemuneType = {
  cidade: string;
  ano: string;
  remuneData: {
    item: number;
    descricao: string;
    nivel_atencao: string;
    local_acesso: string;
    classe: string;
  }[];
};

export default function RemuneContainer({ remunesArray }: { remunesArray: Array<RemuneType> }) {
  const cidades = remunesArray.map((elem, index) => ({
    indexOfArray: index,
    cidade: elem.cidade,
    string: elem.cidade + "(" + elem.ano + ")",
  }));

  const [remuneForDisplay, setRemuneForDisplay] = useState(remunesArray[0]);
  const [filter, setFilter] = useState([]);
  const [display, setDisplay] = useState(remuneForDisplay);
  const [query, setQuery] = useState("");

  const atencoes = [
    {
      id: "1",
      label: "Atenção Primária",
      data: remuneForDisplay.remuneData.filter((elem) => elem.nivel_atencao.includes("PRIMÁRIA")),
    },
    {
      id: "2",
      label: "Atenção Secundária",
      data: remuneForDisplay.remuneData.filter((elem) => elem.nivel_atencao.includes("SECUNDÁRIA")),
    },
    {
      id: "3",
      label: "Atenção Terciária/Outros",
      data: remuneForDisplay.remuneData.filter(
        (elem) => !/primária|secundária/i.test(elem.nivel_atencao)
      ),
    },
  ];
  const classesOfMed = [];
  ///elaborar depois
  const filters = [...atencoes, ...classesOfMed];

  ////stateChanges
  const onSelectChange = (e) => {
    // const indexOfArray = e.target.value;
    const selected = remunesArray.find((elem) => elem.cidade === e.target.value);
    setRemuneForDisplay(selected);
    setDisplay(selected);
    //setDisplay(selected)
  };

  const onchangeQuery = (e) => {
    const value = e.target.value as string;
    setQuery(value);
    if (value.length < 3) {
      setDisplay(remuneForDisplay);
    } else {
      const normalizedValue = retirarAcentos(value);

      const filteredArray = display.remuneData.filter((elem) =>
        retirarAcentos(elem.descricao).includes(normalizedValue)
      );
      setDisplay({ ...display, remuneData: filteredArray });
    }
  };

  const onButtonClick = (id: string) => {
    setQuery("");
    if (filter.length > 0 && filter.includes(id[0])) {
      //togle, notSelected
      setFilter([]);
      setDisplay(remuneForDisplay);
    } else {
      const filterSelecter = filters.find((filtro) => filtro.id == id);
      setFilter([...id]);
      setDisplay({ ...display, remuneData: filterSelecter.data });
    }
  };

  return (
    <>
      <RemuneControl
        firstFilter={atencoes}
        onSelectChange={onSelectChange}
        display={display}
        cidades={cidades}
        query={query}
        onchangeQuery={onchangeQuery}
        onButtonClick={onButtonClick}
        selectedIds={filter}
      />
      <RemuneDisplay display={display} />
    </>
  );
}
