import { addDays } from "date-fns";

type Object = {
  dose: number;
  doseArray: Array<number>;
  tempo: number;
  inicio: Date;
  termino: Date;
};
type ObjectModified = Object & {
  de20: number;
  de20Cps: number;
  de5: number;
  de5Cps: number;
  alt: number;
};

function doseIntoArray(dose: number): Array<number> {
  return [Math.floor(dose / 20) * 20, dose - Math.floor(dose / 20) * 20];
}

function arrayIntoString({
  totalDe20,
  totalDe5,
  arrayOfDoses,
}: {
  totalDe20: number;
  totalDe5: number;
  arrayOfDoses: ObjectModified[];
}) {
  ///header
  let header = `Uso Oral:\n\n`;
  if (totalDe20 != 0) {
    header =
      header +
      `1)Prednisona 20mg -------------------------------------------------- ${totalDe20} comprimidos.\n`;
  }
  const indexOfPred5 = totalDe20 != 0 ? 2 : 1;

  header =
    header +
    `${indexOfPred5})Prednisona 5mg -------------------------------------------------- ${totalDe5} comprimidos.\n`;

  ///instruções
  const instrucoes = `\nUtilize as doses conforme recomendado abaixo:\n\n`;

  ///corpo
  const arrayOfPosologias: string[] = [];
  arrayOfDoses.map((elem) => {
    if (elem.alt === 0) {
      if (elem.de20 != 0 && elem.de5 === 0) {
        arrayOfPosologias.push(
          `Tomar ${elem.de20} ${elem.de20 > 1 ? "comprimidos" : "comprimido"} de 20mg do dia ${elem.inicio.toLocaleDateString("pt-BR")} ao dia ${elem.termino.toLocaleDateString("pt-BR")}.\n`
        );
      } else if (elem.de20 != 0 && elem.de5 != 0) {
        arrayOfPosologias.push(
          `Tomar ${elem.de20} ${elem.de20 > 1 ? "comprimidos" : "comprimido"} de 20mg e ${elem.de5} ${elem.de5 > 1 ? "comprimidos" : "comprimido"} de 5mg do dia ${elem.inicio.toLocaleDateString("pt-BR")} ao dia ${elem.termino.toLocaleDateString("pt-BR")}.\n`
        );
      } else {
        const isInteger = Number.isInteger(elem.de5);
        if (isInteger) {
          arrayOfPosologias.push(
            `Tomar ${elem.de5} ${elem.de5 > 1 ? "comprimidos" : "comprimido"} de 5mg do dia ${elem.inicio.toLocaleDateString("pt-BR")} ao dia ${elem.termino.toLocaleDateString("pt-BR")}.\n`
          );
        } else {
          const resto =
            Math.floor(elem.de5) === 0
              ? "meio comprimido(1/2)"
              : `${Math.floor(elem.de5)} comprimido e meio(1/2)`;
          arrayOfPosologias.push(
            `Tomar ${resto} de 5mg do dia ${elem.inicio.toLocaleDateString("pt-BR")} ao dia ${elem.termino.toLocaleDateString("pt-BR")}.\n`
          );
        }

        //const isInteger = Number.isInteger(elem.only5)?elem.only5:`${Math.floor(elem.only5)} ${elem.only5}  (meio)`
      }
    } else {
      if (elem.de5 === 0) {
        arrayOfPosologias.push(
          `Tomar meio comprimido (1/2) de 5mg em dias alternados(tomar dia sim, tomar dia não) do dia ${elem.inicio.toLocaleDateString("pt-BR")} ao dia ${elem.termino.toLocaleDateString("pt-BR")}.\n`
        );
      } else {
        arrayOfPosologias.push(
          `Tomar 1 comprimido alternando com meio comprimido (1/2) de 5mg (tomar 1 comprimido em um dia , tomar meio comprimido no dia seguinte) do dia ${elem.inicio.toLocaleDateString("pt-BR")} ao dia ${elem.termino.toLocaleDateString("pt-BR")}.\n`
        );
      }

      ///alternados
    }
  });

  let corpo = "";
  arrayOfPosologias.forEach((string, idx) => (corpo = corpo + `${idx + 1} - ` + string));

  return header + instrucoes + corpo;
}

export default function cortiDesamameFunction(cortiInput: number) {
  const today = new Date();
  const initialReducer = cortiInput * 0.8;
  const initialDose = Math.round(initialReducer / 5) * 5; //arredonda para numero divisivel por 5
  const initialDoseArray = doseIntoArray(initialDose);
  let tempoPadrao = 7;
  if (initialDose <= 20 && initialDose > 5) {
    tempoPadrao = 14;
  }
  if (initialDose <= 5) {
    tempoPadrao = 14;
  }
  const initialTermino = addDays(today, tempoPadrao);
  const firstObject: Object = {
    dose: initialDose,
    doseArray: initialDoseArray,
    tempo: tempoPadrao,
    inicio: today,
    termino: initialTermino,
  };
  let array = [firstObject];

  //dose >40
  if (array[array.length - 1].dose > 40) {
    const tempo = 7;
    let dose = array[array.length - 1].dose;
    let inicio = array[array.length - 1].inicio;
    let termino = array[array.length - 1].termino;

    do {
      dose -= 10;
      inicio = addDays(termino, 1);
      termino = addDays(inicio, tempo);

      array.push({
        dose: dose,
        doseArray: doseIntoArray(dose),
        inicio: inicio,
        termino: termino,
        tempo: tempo,
      });
    } while (dose > 40);
  }

  //// <=40 e >20
  if (array[array.length - 1].dose <= 40 && array[array.length - 1].dose > 20) {
    const tempo = 7;
    let dose = array[array.length - 1].dose;
    let inicio = array[array.length - 1].inicio;
    let termino = array[array.length - 1].termino;

    do {
      dose -= 5;
      inicio = addDays(termino, 1);
      termino = addDays(inicio, tempo);

      array.push({
        dose: dose,
        doseArray: doseIntoArray(dose),
        inicio: inicio,
        termino: termino,
        tempo: tempo,
      });
    } while (dose > 20);
  }

  /// <=20 e >10
  if (array[array.length - 1].dose <= 20 && array[array.length - 1].dose > 10) {
    const tempo = 14;
    let dose = array[array.length - 1].dose;
    let inicio = array[array.length - 1].inicio;
    let termino = array[array.length - 1].termino;

    do {
      dose = dose - 5;
      inicio = addDays(termino, 1);
      termino = addDays(inicio, tempo);

      array.push({
        dose: dose,
        doseArray: doseIntoArray(dose),
        inicio: inicio,
        termino: termino,
        tempo: tempo,
      });
    } while (dose > 10);
  }

  ///>=10 e <5
  if (array[array.length - 1].dose <= 10 && array[array.length - 1].dose > 5) {
    const tempo = 14;
    let dose = array[array.length - 1].dose;
    let inicio = array[array.length - 1].inicio;
    let termino = array[array.length - 1].termino;

    do {
      dose = dose - 2.5;
      inicio = addDays(termino, 1);
      termino = addDays(inicio, tempo);

      array.push({
        dose: dose,
        doseArray: doseIntoArray(dose),
        inicio: inicio,
        termino: termino,
        tempo: tempo,
      });
    } while (dose > 5);
  }

  ///<5mg
  if (array[array.length - 1].dose <= 5) {
    const termino = array[array.length - 1].termino;

    const cincoArray = [
      {
        dose: 5,
        doseArray: [0, 5, 2.5],
        inicio: addDays(termino, 1),
        termino: addDays(termino, 15),
        tempo: 14,
      },
      {
        dose: 2.5,
        doseArray: [0, 2.5, 0],
        inicio: addDays(termino, 16),
        termino: addDays(termino, 30),
        tempo: 14,
      },
      {
        dose: 0,
        doseArray: [0, 0, 2.5],
        inicio: addDays(termino, 31),
        termino: addDays(termino, 46),
        tempo: 14,
      },
    ];
    array = [...array, ...cincoArray];
  }

  ////adicionar quantitativo de cps ao array.
  const arrayModified = array.map((elem) => {
    const de20 = elem.doseArray[0] / 20;
    const de5 = elem.doseArray[1] / 5;
    const alternados = elem.doseArray[2] ? elem.doseArray[2] / 5 : 0;
    return {
      ...elem,
      de20: de20,
      de20Cps: de20 * elem.tempo,
      de5: de5,
      de5Cps: de5 * elem.tempo,
      alt: alternados,
    };
  });

  const totalDe20 = arrayModified.reduce((acc, cur) => acc + cur.de20Cps, 0);

  const totalDe5 = arrayModified
    .map((elem) => {
      return [elem.de5Cps, elem.alt];
    })
    .flat()
    .map((elem) => {
      if (elem === 0.5) {
        return 1;
      } else if (Number.isInteger(elem) === false) {
        return Math.floor(elem) + 1;
      } else {
        return elem;
      }
    })
    .reduce((acc, cur) => acc + cur);

  const string = arrayIntoString({ arrayOfDoses: arrayModified, totalDe20, totalDe5 });

  return { arrayOfDoses: arrayModified, totalDe20, totalDe5, string };
}
