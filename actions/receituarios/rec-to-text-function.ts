"use server";

const quantidadeReference = [
  /(\d+)\s*comprimido(?:s)?\/m[eê]s/i,
  /(\d+)\s*comprimido(?:\(s\)|s) de (\d+) mg/i,
  /(\d+)\s*comprimido(?:\(s\)|s)/i,
  /(\d+)\s*Unidade(?:\(s\)|s)/gi,
];

const posologiaReference = {
  MID: [
    /1 vez ao dia/i,
    "Tomar 1 comprimido ao dia",
    /(\d+)\s*Comprimido\(s\)\s*de\s*(\d+)\s*mg,\s*Uso Oral,\s*(1 vez à noite|1 vez pela manh(ã|a|á|ä)|1 vez ao dia)\s*, durante\s*(\d+)\s*dias/i,
    /tomar\s*1\s*(comprimido|cp)\s*(ao\s*dia|1x\/dia)/i,
    "1 vez pela manhã",
    "1 vez à noite",
    "TOMAR 1 COMPRIMIDO, PELA MANHÃ",
  ],
  BID: [
    /(12 em 12 horas)/i,
    "Tomar 1 comprimido de 12/12 horas",
    /tomar\s*1\s*(comprimido|cp|cápsula )\s*(de\s*)?(12\/12|2x\/dia|duas\s*vezes\s*ao\s*dia)/i,
  ],
  TID: [
    "Tomar 1 comprimido de 8/8 horas",
    /tomar\s*1\s*(comprimido|cp)\s*(de\s*)?(8\/8|3x\/dia|tr[eê]s\s*vezes\s*ao\s*dia)/i,
  ],
  QID: ["Tomar 1 comprimido de 6/6 horas"],
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
    .replace(/(\d+)\s*(\))/i, "")
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
    .replace(/comprimido/gi, "")
    .replace(/unidade/gi, "")
    .replace(/(\W)/gi, " ");

  let finalString: string = "";

  const splitedString = secondClean.split(" ").filter((elem) => {
    const regEx = new RegExp(/\W+/, "i");
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
  let isSobDemanda = false;
  let modifiedString = "";

  for (const frase of sobDemandaReference) {
    const regEx = new RegExp(frase, "gi");
    if (regEx.test(string)) {
      isSobDemanda = true;
      break;
    }
  }

  for (const [codigo, frases] of Object.entries(posologiaReference)) {
    for (const frase of frases) {
      const regEx = typeof frase === "string" ? new RegExp(frase, "gi") : frase;
      if (regEx.test(string)) {
        modifiedString = codigo;
        break;
      }
    }
  }

  if (modifiedString.length === 0) {
    modifiedString = "q_";
  }
  if (isSobDemanda) {
    modifiedString = modifiedString + " " + "SN";
  }

  return modifiedString;
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
