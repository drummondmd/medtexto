"use server";

import searchInCmed from "./searchCmed";
import searchRemune from "./searchRemune";
import recToTexFunction from "../receituarios/rec-to-text-function";
import textToRecFunction from "../receituarios/text-to-rec-function";

export type ResultType = {
  temRemune: boolean;
  alternatives: string[];
  classeT: string;
  priceUnit: string | number;
  med: string;
  dosagem: string;
  posologia: string;
  modPos: string;
  tempo: string;
  isSN: boolean;
  isTempo: boolean;
  splited: string[];
  posologiaText: string;
  quantidade: string;
  quantidadeNumber: number;
  hyphen: string;
}[];

type Return = Promise<
  { success: false; message: string } | { success: true; message?: string; result: ResultType }
>;

export default async function findPriceAndRemuneAction(input: string): Return {
  ///err validation
  if (!input || input.trim() === "") return { success: false, message: "Entrada inválida" };

  ///avaliar se input é receita ou texto.
  const regEx = /\b(MID|BID|TID|QID|q_)\b/gi;
  const isText = regEx.test(input);
  let text = input;
  if (!isText) {
    const result = await recToTexFunction(input);
    if (!result.success) {
      return { success: false, message: "Formato de receita Inválido!" };
    } else {
      text = result.output;
    }
  }

  //transformar texto em Array de objetos para manipulação.
  const transformedInput = await textToRecFunction(text, "", true);
  if (!transformedInput.success) {
    return { success: false, message: "Formato de texto ou receita Inválido!" };
  }

  ///buscar no CMED e adicionar classe e preço, se existir
  const cmedSearch = transformedInput.arrayOfObj.map((item) => {
    const { classeT, priceUnit } = searchInCmed(item.med, item.dosagem);
    return { ...item, classeT, priceUnit };
  });

  const remuneSearch = cmedSearch.map((item) => {
    ///passando bh como remune key de padrão
    const { temRemune, alternatives } = searchRemune("bh", item.med, item.dosagem, item.classeT);
    return { ...item, temRemune, alternatives };
  });

  ////se tudo dar certo
  return { success: true, result: remuneSearch };
}
