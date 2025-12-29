"use server";

type ReturninObj = {
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
};

import receituarioFb from "../admin-actions/rec-fb-action";

const snRegEx = /(sn|sos)/i;
const tempoDeterminadoRegEx = /(\d+)(-)(\w)/i;
const dosagemRegEx = /(mg|mcg|ml)/i;
const posologiaRegEx = /\b(MID|BID|TID|QID|q_\d+)\b/i;
const modPosologiaRegEx = /(cp|(\d+)ml)/i;

export default async function textToRecFunction(
  text: string,
  receita?: string,
  returnArray?: boolean
): Promise<{ success: boolean; output?: string; message?: string; arrayOfObj?: ReturninObj[] }> {
  if (!text) return { success: false, message: "Insira valor válido" };

  const array = text
    .split(/(;|\||(?<!\d),(?!\d))/gi)
    .filter((elem) => elem != "" && elem.length > 1)
    .map((string) => {
      const isSN = snRegEx.test(string);
      const isTempo = tempoDeterminadoRegEx.test(string);
      const isModificador = modPosologiaRegEx.test(string);

      const splited = string.split(" ").filter((elem) => elem != "");

      const isTempoIndex = splited.findIndex((elem) => tempoDeterminadoRegEx.test(elem));
      const posologiaIndex = splited.findIndex((elem) => posologiaRegEx.test(elem));
      const modificadorIndex = splited.findIndex((elem) => modPosologiaRegEx.test(elem));
      const dosagem = dosagemRegEx.test(splited[1]) ? splited[1] : splited[1] + splited[2];
      const tempo = isTempo ? splited[isTempoIndex] : undefined;
      ///se não tiver dosagem bolar algo depois.
      const modPos = isModificador ? splited[modificadorIndex] : undefined;

      const { posologiaText, quantidade, quantidadeNumber } = posologiaQntText(
        isSN,
        isTempo,
        isModificador,
        splited[posologiaIndex],
        modPos,
        tempo
      );

      return {
        med: medName(splited[0]),
        dosagem,
        posologia: splited[posologiaIndex],
        modPos,
        tempo,
        isSN,
        isTempo,
        splited,
        posologiaText,
        quantidade,
        quantidadeNumber,
        hyphen: conditionalHyphen(splited[0], dosagem),
      };
    });

  const finalArray = [];
  const isSnArray = array.filter((elem) => elem.isSN);
  const mue = array.filter((elem) => elem.isTempo && elem.isSN === false);
  const muc = array.filter((elem) => !elem.isTempo && !elem.isSN);

  muc.forEach((elem) => finalArray.push(elem));
  mue.forEach((elem) => finalArray.push(elem));
  isSnArray.forEach((elem) => finalArray.push(elem));

  let string = "Uso Oral:\n\n";

  ///se o desjeado for o array e não a string
  if (returnArray) {
    return { success: true, arrayOfObj: finalArray };
  }

  if (!receita) {
    finalArray.forEach((element, index) => {
      string =
        string +
        (index + 1) +
        ")" +
        element.med +
        " " +
        element.dosagem +
        " " +
        element.hyphen +
        " " +
        element.quantidade +
        "\n" +
        element.posologiaText +
        ".\n" +
        "\n";
    });

    receituarioFb("textToRec", text, string);

    return { success: true, message: "Tudo certo", output: string };
  } else {
    finalArray.forEach((element, index) => {
      string =
        string +
        (index + 1) +
        ")" +
        element.med +
        " " +
        element.dosagem +
        " " +
        element.hyphen +
        " " +
        element.quantidade +
        "\n" +
        element.posologiaText +
        ".\n" +
        "\n";
    });
    receituarioFb("textToRec", text, string);
    return { success: true, message: "Tudo certo", output: string };
  }
}

///funçoes essenciais
function posologiaQntText(
  isSN: boolean,
  isTempo: boolean,
  isModificador: boolean,
  posologia: string,
  modPos: string,
  tempo: string
): { isError: boolean; posologiaText: string; quantidade: string; quantidadeNumber: number } {
  const snText = isSN ? ",em caso de necessidade" : "";
  let tempoText = "";

  let cps = 1;
  let unidade = "comprimido";
  let plural = "";
  let qNumber: string | number;
  let result = 30;
  if (isSN) result = 7;
  let multiplicador = 30;
  if (isSN) multiplicador = 7;
  let finalStatement = "Uso conforme indicado";

  let unitario = 1;

  if (isModificador) {
    const [number, unidadeSplited] = modPos.match(/^(\d+)([a-zA-Z]+)$/).slice(1);
    if (parseInt(number) != 1) {
      cps = parseInt(number);
      plural = "s";
    }
    if (unidadeSplited != "cp") {
      ///melhorar depois
      unidade = unidadeSplited;
    }
  }

  const mid = {
    regEx: new RegExp("(MID|24\/24.*|1x|qd|sid)", "gi"),
    statement: `Tomar ${cps} ${unidade}${plural} ao dia`,
    quantidade: 1 * multiplicador * cps,
    unitario: 1,
  };
  const bid = {
    regEx: new RegExp("(BID|12\/12.*|2x)", "gi"),
    statement: `Tomar ${cps} ${unidade}${plural} de 12/12 horas`,
    quantidade: 2 * multiplicador * cps,
    unitario: 2,
  };
  const tid = {
    regEx: new RegExp("(TID|8\/8.*|3x)", "gi"),
    statement: `Tomar ${cps} ${unidade}${plural} de 8/8 horas`,
    quantidade: 3 * multiplicador * cps,
    unitario: 3,
  };
  const qid = {
    regEx: new RegExp("(QID|6\/6.*|4x)", "gi"),
    statement: `Tomar ${cps} ${unidade}${plural} de 6/6 horas`,
    quantidade: 4 * multiplicador * cps,
    unitario: 4,
  };
  const q_ = { regEx: new RegExp("q_.*", "gi") };

  if (mid.regEx.test(posologia)) {
    finalStatement = mid.statement;
    result = mid.quantidade;
    unitario = mid.unitario;
  } else if (bid.regEx.test(posologia)) {
    finalStatement = bid.statement;
    result = bid.quantidade;
    unitario = bid.unitario;
  } else if (tid.regEx.test(posologia)) {
    finalStatement = tid.statement;
    result = tid.quantidade;
    unitario = tid.unitario;
  } else if (qid.regEx.test(posologia)) {
    finalStatement = qid.statement;
    result = qid.quantidade;
    unitario = qid.unitario;
  } else if (q_.regEx.test(posologia)) {
    qNumber = parseInt(posologia.replace(/[^0-9]/g, ""));
    const cpsDia = 24 / qNumber;
    const statement = `Tomar ${cps} ${unidade}${plural} de ${qNumber}/${qNumber} horas `;
    finalStatement = statement;
    result = cpsDia * cps * 30;
    unitario = cpsDia;
  }

  let quantidade = `${result} ${unidade}${plural}/mês. `;

  if (isTempo) {
    const [tempoTextModifier, quantidadeResult, quantidadeNumber] = isTempoModifier(
      cps,
      tempo,
      unitario
    );
    tempoText = tempoTextModifier;
    quantidade = quantidadeResult;
    result = quantidadeNumber;
  }

  if (isSN) quantidade = `${result} comprimidos. `;
  finalStatement = finalStatement + tempoText + snText;

  return { isError: false, posologiaText: finalStatement, quantidade, quantidadeNumber: result };
}

function isTempoModifier(cps: number, tempo: string, unitario: number): [string, string, number] {
  const result = unitario;
  const num = parseInt(tempo.replace(/[^0-9]/g, ""));
  const dma = tempo.replace(/[^a-z]/g, "");

  const isSingular = num === 1 ? true : false;
  const reference = {
    undefined: { mult: 1, string: isSingular ? "dia" : "dias" },
    d: { mult: 1, string: isSingular ? "dia" : "dias" },
    s: { mult: 7, string: isSingular ? "semana" : "semanas" },
    m: { mult: 30, string: isSingular ? "mes" : "meses" },
    a: { mult: 365, string: isSingular ? "ano" : "anos" },
  };
  const { mult, string } = reference[dma];

  const total = `${num * mult * result * cps} comprimidos`;

  return [`,por ${num} ${string}`, total, num * mult * result * cps];
}

function conditionalHyphen(med: string, dosagem: string) {
  const conditialLenght = med.length + dosagem.length;
  let x = 55;
  if (conditialLenght > x) {
    x = 150 - conditialLenght;
  } else {
    x -= conditialLenght;
  }
  return "-".repeat(x);
}

function medName(med: string) {
  const outputMed = med.split("-").join(" ");
  return outputMed;
}
