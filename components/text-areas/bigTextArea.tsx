"use client";

import { useRef, useState } from "react";

import { updateBloco } from "@/lib/databases/handler-mongodb";

type PropType = {
  updateFuncion: () => void; ///mas seria melhor retornar na vdd
  state: string;
  addicionalItens?: [];
};

// const TextArea = ({ textAreaRef, textState, onChangeInput }) => {
//     return (

//     );
// };

export default function BigTextArea({ updateFuncion, state, addicionalItens }: PropType) {
  const [textState, setTextState] = useState(state);
  const textAreaRef = useRef(null);

  ///ajuste altura
  function ajustarAltura() {
    const ta = textAreaRef.current;
    if (!ta) return;
    ta.style.height = "auto"; // limpa tamanho anterior
    ta.style.height = `${ta.scrollHeight}px`; // ajusta à altura do conteúdo
  }

  //funções para manipular texto e db
  function onChangeInput(e) {
    ajustarAltura();
    setTextState(e.target.value);
  }

  function changeCase(whatCase: "upper" | "lower" | "first") {
    ///fazer usestate para mudar aspecto depois
    if (whatCase === "upper") {
      const newInput = textState.toUpperCase();
      setTextState(newInput);
    }
    if (whatCase === "lower") {
      const newInput = textState.toLowerCase();
      setTextState(newInput);
    }
    if (whatCase === "first") {
      // let newInput = input.replace(input[0],input[0].toUpperCase())
      const array = textState.split("\n");
      const arrayFirstUpperCase = [];

      array.forEach((linha: string) => {
        if (linha.length > 1) {
          arrayFirstUpperCase.push(linha.replace(linha[0], linha[0].toUpperCase()));
        } else {
          arrayFirstUpperCase.push(linha);
        }
      });

      const newInput = arrayFirstUpperCase.join("\n");
      setTextState(newInput);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function saveToDatabase(path: "bloco", input: string, user: any) {
    ///mudando a depender de onde será salvo
    if (path === "bloco") {
      updateBloco(user, input);
    }
  }

  function renderControl() {
    let defaultBtn: Array<{
      title: string;
      svg: any;
      onClick: () => void;
      svgBefore?: any;
      className?: string;
    }> = [
      {
        title: "Máiscula",
        onClick: () => changeCase("upper"),
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            className="fill-gray-700"
          >
            <path d="M660-263v-246l-57 57-51-51 144-144 144 144-51 51-57-57v246h-72Zm-516 0 162-432h78l162 432h-75l-38-110H258l-39 110h-75Zm136-172h130l-63-179h-4l-63 179Z" />
          </svg>
        ),
      },
      {
        title: "Minúscula",
        onClick: () => changeCase("lower"),
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            className="fill-gray-700"
          >
            <path d="M322-263q-51 0-79.5-26.5T214-363q0-44 33-70.5t87-26.5q20 0 41 4t40 11v-9q0-30-20-48.5T342-521q-23 0-41 9t-33 28l-45-35q20-27 51.5-41.5T344-575q64 0 98.5 31.5T477-455v182h-62v-36h-3q-17 24-39 35t-51 11Zm11-53q34 0 58-23.5t24-56.5q-14-8-31.5-12t-37.5-4q-33 0-50 12.5T279-363q0 21 15 34t39 13Zm363 53L552-407l51-51 57 57v-246h72v246l57-57 51 51-144 144Z" />
          </svg>
        ),
      },
      {
        title: "Primeira Maiúscula",
        onClick: () => changeCase("first"),
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            className="fill-gray-700"
          >
            <path d="M347-249v-360H229v-63h302v63H413v360h-66Zm337 9q-43.06 0-67.53-25.23Q592-290.47 592-335v-158h-52v-58h52v-85h65v85h73v58h-73v144.54Q657-326 667.28-313t27.91 13q8.81 0 17.81-3 9-3 18-9v63.16Q720-244 708.63-242q-11.37 2-24.63 2Z" />
          </svg>
        ),
      },
      {
        title: "Apagar",
        onClick: () => {
          setTextState("");
          updateFuncion;
        },
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="fill-gray-700"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        ),
      },
      {
        title: "Copiar",
        onClick: () => copyToClipboard(textState),
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="fill-gray-700"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
            />
          </svg>
        ),
        svgBefore: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="fill-gray-700"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
            />
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
          </svg>
        ),
      },
      {
        title: "Salvar",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="fill-gray-700"
            viewBox="0 0 16 16"
          >
            <path d="M11 2H9v3h2z" />
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
          </svg>
        ),
        svgBefore: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="fill-gray-700"
            viewBox="0 0 16 16"
          >
            <path d="M12 2h-2v3h2z" />
            <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
          </svg>
        ),
        onClick: () => saveToDatabase("bloco", textState, "teste"),
      },
    ];

    if (addicionalItens) {
      defaultBtn = [...defaultBtn, ...addicionalItens];
    }

    const ItemOfControl = ({
      title,
      onClick,
      svg,
      svgBefore,
      className,
    }: {
      title: string;
      onClick: () => void;
      svg: any;
      svgBefore?: any;
      className?: string;
    }) => {
      return (
        <button
          title={title}
          aria-label={title}
          className="flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          onClick={onClick}
        >
          {svg}
        </button>
      );
    };

    const StatusOfControl = () => {
      return (
        <div className="flex items-center px-3 py-2 text-sm text-gray-500 border-r border-gray-200">
          Status: <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
      );
    };

    return (
      <div
        className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-2 my-3 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <StatusOfControl />
        <div className="flex gap-1">
          {defaultBtn.map((btn) => (
            <ItemOfControl key={btn.title} title={btn.title} onClick={btn.onClick} svg={btn.svg} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 px-4 mx-auto max-w-full" onClick={updateFuncion}>
      {renderControl()}
      <div className="my-3">
        <textarea
          ref={textAreaRef}
          spellCheck={true}
          name="temp"
          maxLength={45000}
          placeholder="Digite ou cole seu texto aqui..."
          className="w-full min-h-[350px] box-border p-3 text-base leading-6 border border-gray-300 rounded-lg bg-white shadow-none resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={textState}
          onChange={onChangeInput}
        ></textarea>
      </div>
    </div>
  );
}
