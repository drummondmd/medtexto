import cmed from "@/data/cmed/xls_conformidade_site_20251208_170820642_normalizado.json";

type CmedObj = {
  SUBSTÂNCIA: string;
  LABORATÓRIO: string;
  PRODUTO: string;
  APRESENTAÇÃO: string;
  "CLASSE TERAPÊUTICA": string;
  "PMC Sem Impostos": string;
  priceUnit: string;
};

export default function searchInCmed(
  med: string,
  dosagem: string
): { classeT: string | undefined; priceUnit: string | number | undefined } {
  const isCombinationOfMedOrSubs = med.includes("+") ? true : false;

  let cmedFilteredByMed = filterCmedJsonByMed(cmed as CmedObj[], isCombinationOfMedOrSubs, med);

  if (cmedFilteredByMed.length <= 1) {
    const invertedBoolean = filterCmedJsonByMed(cmed as CmedObj[], !isCombinationOfMedOrSubs, med);
    if (invertedBoolean.length > cmedFilteredByMed.length) {
      cmedFilteredByMed = invertedBoolean;
    }
  }

  if (cmedFilteredByMed.length === 0) {
    return { classeT: undefined, priceUnit: undefined };
  }
  const filteredByDos = cmedFilteredByMed.filter((item) => {
    const dosagemSplited = dosagem.split(/(\d+)/).join(" ").trim();
    const regEx = new RegExp(dosagem, "gi");
    const regEx2 = new RegExp(dosagemSplited, "gi");
    if (regEx.test(item.APRESENTAÇÃO) || regEx2.test(item.APRESENTAÇÃO)) {
      return true;
    } else {
      return false;
    }
  });

  if (filteredByDos.length > 0) {
    const itemFromCmed = filteredByDos[0];
    const medianPrice = medianPriceReturn(filteredByDos);
    return { classeT: itemFromCmed["CLASSE TERAPÊUTICA"], priceUnit: medianPrice };
  } else {
    const itemFromCmed = cmedFilteredByMed[0];
    return { classeT: itemFromCmed["CLASSE TERAPÊUTICA"], priceUnit: itemFromCmed.priceUnit };
  }
}

function filterCmedJsonByMed(cmed: CmedObj[], isCombinationOfMedOrSubs: boolean, med: string) {
  return cmed.filter((item) => {
    ///se não for combinação
    if (!isCombinationOfMedOrSubs && item.SUBSTÂNCIA.includes(";") === false) {
      med = med.replace("+", " ");
      if (item.SUBSTÂNCIA.toLowerCase().includes(med.toLowerCase())) {
        return true;
      } else if (item.PRODUTO.toLowerCase().includes(med.toLowerCase())) {
        return true;
      } else {
        return false;
      }
      ///sendo combinação
    } else {
      if (!item.SUBSTÂNCIA.includes(";") || !isCombinationOfMedOrSubs) {
        return false;
      } else {
        const splitedMed = med.split("+").filter((word) => word != "de");
        const splitedSubs = item.SUBSTÂNCIA.split(";");
        const bothPresent = [];
        for (const med of splitedMed) {
          for (const sub of splitedSubs) {
            const test = sub.toLowerCase().includes(med.toLowerCase());
            if (test) {
              bothPresent.push(test);
            }
          }
        }

        if (splitedMed.length === bothPresent.length) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
}

function medianPriceReturn(array: CmedObj[]): number | undefined {
  if (!array || array.length === 0) return undefined;
  if (array.length === 1) return Number(array[0].priceUnit);
  const priceArray = array
    .filter((item) => item.priceUnit != null)
    .map((item) => Number(item.priceUnit));
  const sorted = priceArray.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  // Caso ímpar
  if (sorted.length % 2 !== 0) {
    return sorted[middle];
  }

  // Caso par
  return (sorted[middle - 1] + sorted[middle]) / 2;
}
