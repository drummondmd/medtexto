"use server";

import receituarioFb from "../admin-actions/rec-fb-action";

const quantidadeReference = [
  /(\d+)\s*comprimido(?:s)?\/m[eê]s/i,
  /(\d+)\s*comprimido(?:\(s\)|s) de (\d+) mg/i,
  /(\d+)\s*comprimido(?:\(s\)|s)/i,
  /(\d+)\s*Unidade(?:\(s\)|s)/i,
  /(?:uso\s+)?cont(?:i|í|ì)nuo/i,
];

const posologiaReference = {
  QID: ["Tomar 1 comprimido de 6/6 horas"],
  TID: [
    "Tomar 1 comprimido de 8/8 horas",
    /tomar\s*1\s*(comprimido|cp)\s*(de\s*)?(8\/8|3x\/dia|tr[eê]s\s*vezes\s*ao\s*dia)/i,
  ],
  BID: [
    /(12 em 12 horas)|(12\/12)/i,
    "Tomar 1 comprimido de 12/12 horas",
    /tomar\s*1\s*(comprimido|cp|cápsula )\s*(de\s*)?(12\/12|2x\/dia|duas\s*vezes\s*ao\s*dia)/i,
    "TOMAR 01 COMPRIMIDO NO ALMOÇO E 01 COMPRIMIDO NO JANTAR",
  ],
  MID: [
    /1 vez ao dia/i,
    /(\d+)\s*Comprimido\(s\)\s*de\s*(\d+)\s*mg,\s*Uso Oral,\s*(1 vez à noite|1 vez pela manh(ã|a|á|ä)|1 vez ao dia)\s*, durante\s*(\d+)\s*dias/i,
    /tomar\s*(\d+)\s*(comprimido|cp)\s*(ao\s*dia|1x\/dia)/i,
    /tomar\s*(\d+)\s*(comprimido|cp)\s*\s*(pela\s*manhã|em\s*jejum)/iu,
    /tomar\s*(\d+)\s*(comprimido|cp)\s*\s*(ap(o|ó)s|no)\s*almoço/iu,
    "1 vez pela manhã",
    "1 vez à noite",
  ],
};

const sobDemandaReference = ["em caso de necessidade"];

// const rotaDeAdminstracao = [/(uso oral)\s*(\W)/i];

export default async function recToTexFunction(
  input: string
): Promise<{ success: boolean; output?: string; message?: string }> {
  if (!input) return { success: false, message: "Insirá um valor" };
  let isClean: boolean = true;
  const array = input
    .split("\n")
    .filter((elem) => elem != "")
    .map((elem) => {
      const isMed = isMedFuncion(elem);
      const isPos = isPosFunction(elem);
      const isBoth = isMed != false && isPos != false ? true : false;
      const isTrash = isMed === false && isPos === false ? true : false;

      if (isBoth) {
        isClean = false;
      }
      return {
        string: elem,
        isMed: isMed,
        isPos: isPos,
        isBoth: isBoth,
        isTrash: isTrash,
      };
    })
    .filter((elem) => elem.isTrash === false);

  ////depois fazer um refinamento do is Clean;

  let transformedArray: Array<string> = [];

  if (isClean) {
    transformedArray = cleanTransform(array);
  }
  if (!isClean) {
    transformedArray = dirtyTransform(array);
  }

  ///transformaçao para string
  let outputString: string = "";

  transformedArray.forEach((elem) => {
    outputString = outputString.length === 0 ? elem : outputString + " ; " + elem;
  });

  ////qualityControl.
  //later

  ///se tudo der certo
  //feedback
  receituarioFb("recToText", input, outputString);
  return { success: true, message: "Funcionte", output: outputString };
}

function isMedFuncion(string: string): Array<true> | false {
  const array = [];
  const regExArray = [/\b\d+(\)|\.)/gi, /\d+\s*(mg|mcg)/i];

  for (const regEx of regExArray) {
    if (regEx.test(string)) {
      array.push(true);
    }
  }

  if (array.length === 0) {
    return false;
  } else {
    return array;
  }
}

function isPosFunction(string: string): Array<true> | false {
  const array = [];
  const regExArray = [/(tomar)/i, /(1 vez ao dia|de 12 em 12 horas)/i, /durante\s*(\d+)\s*dias/i];

  for (const regEx of regExArray) {
    if (regEx.test(string)) {
      array.push(true);
    }
  }

  if (array.length === 0) {
    return false;
  } else {
    return array;
  }
}

function cleanTransform(
  arryOfObjects: Array<{
    string: string;
    isMed: false | true[];
    isPos: false | true[];
    isBoth: boolean;
    isTrash: boolean;
  }>
): string[] {
  const outputArray: Array<string> = [];
  arryOfObjects.forEach((elem) => {
    if (elem.isMed != false) {
      outputArray.push(medReplace(elem.string));
    } else {
      outputArray[outputArray.length - 1] =
        outputArray[outputArray.length - 1] + " " + posReplace(elem.string);
      // outputArray.push(posReplace(elem.string));
    }
    // Currently apply the same replacement for both cases; adjust logic here if needed
  });

  return outputArray;
}

function medReplace(string: string): string {
  let outputString = string
    .replace(/(\W)\1+/, "")
    .replace(/(uso oral)\s*(\W)/i, "")
    .replace(/(\d+)\s*(\)|.|-)/i, "")
    .replace(/besilato/i, "")
    .replace(/equivale a/i, "")
    .trim();

  for (const frase of quantidadeReference) {
    const regEx = typeof frase === "string" ? new RegExp(frase, "gi") : frase;
    if (regEx.test(outputString)) {
      outputString = outputString.replace(regEx, "");
      break;
    } else {
      outputString = outputString;
    }
  }

  const secondClean = outputString
    .replace(/comprimido/i, "")
    .replace(/unidade/i, "")
    .replace(/(?<!\w)\W(?!\w)/i, "");

  let finalString: string = "";

  const splitedString = secondClean.split(" ").filter((elem) => {
    const regEx = /(?<!\w)\W(?!\w)/i;
    if (elem === "" || regEx.test(elem)) {
      return false;
    } else {
      return true;
    }
  });

  splitedString.forEach(
    (elem) => (finalString = finalString.length > 0 ? finalString + " " + elem : elem)
  );

  return finalString;
}

function posReplace(string: string): string {
  const isSobDemanda = sobDemandaReference.some((frase) => {
    const regEx = new RegExp(frase, "gi");
    return regEx.test(string);
  });

  const foundPosologia = Object.entries(posologiaReference).find(([_codigo, frases]) =>
    frases.some((frase) => {
      const regEx = typeof frase === "string" ? new RegExp(frase, "i") : frase;
      return regEx.test(string);
    })
  );
  let codigo = foundPosologia[0] != undefined ? foundPosologia[0] : "q_";

  if (isSobDemanda) {
    codigo = codigo + " " + "SN";
  }

  return codigo;
}

function dirtyTransform(
  arryOfObjects: Array<{
    string: string;
    isMed: false | true[];
    isPos: false | true[];
    isBoth: boolean;
    isTrash: boolean;
  }>
): string[] {
  const splited = [];
  arryOfObjects.forEach((elem) => {
    const arrayOfStrings = elem.string.split(/(\d+)\s*(\))|(\.|;)|(Uso Oral)/gi);
    arrayOfStrings.forEach((string) => {
      if (string != undefined) {
        const cleanedString = string
          .replace(/(\d+)\s*comprimido\(s\)/gi, "")
          .replace(/comprimido/gi, "")
          .replace(/(de)\s*(\d+)\s*(mg|mcg)/gi, "");
        splited.push(cleanedString);
      }
    });
  });
  //string antigo= arryOfObjects.map(elem => {elem.string.split(/(\.|;)|(\d+)\s*(\))|(\d+)\s*(Comprimido\(s\)|Unidades\(s\))|(Uso Oral)|/gi))

  const splitedFiltered = splited
    .filter((elem) => elem != "")
    .map((elem) => {
      const isMed = isMedFuncion(elem);
      const isPos = isPosFunction(elem);
      const isBoth = isMed != false && isPos != false ? true : false;
      const isTrash = isMed === false && isPos === false ? true : false;

      return {
        string: elem,
        isMed: isMed,
        isPos: isPos,
        isBoth: isBoth,
        isTrash: isTrash,
      };
    })
    .filter((elem) => elem.isTrash === false);

  const arryOfObjects2: Array<{
    string: any;
    isMed: false | true[];
    isPos: false | true[];
    isBoth: boolean;
    isTrash: boolean;
  }> = [];

  splitedFiltered.forEach((elem, idx) => {
    if (elem.isMed) {
      if (idx === 0) {
        arryOfObjects2.push(elem);
      } else if (idx != 0 && arryOfObjects2[arryOfObjects2.length - 1].isMed === false) {
        arryOfObjects2.push(elem);
      } else {
        ///se ultimo item for med checar se atual ou previo é o maior e colocar.
        if (arryOfObjects2[arryOfObjects2.length - 1].string.length < elem.string.length) {
          arryOfObjects2[arryOfObjects2.length - 1] = elem;
        }
      }
    } else if (elem.isPos) {
      arryOfObjects2.push(elem);
    }
  });

  return cleanTransform(arryOfObjects2);
}
