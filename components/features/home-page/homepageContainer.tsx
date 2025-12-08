"use client";

import { useEffect, useState } from "react";

import { useDebounce } from "@/components/hooks/useDebouce";

import Login from "./login";

const Hero = ({ isRegistring }) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center
                h-full w-full max-w-5xl  lg:mx-auto lg:p-6 space-y-4"
    >
      {/* H1 com máximo destaque */}
      <h1
        className="text-white text-pretty font-extrabold
                 text-5xl sm:text-6xl lg:text-7xl tracking-tight drop-shadow-md"
      >
        Medtexto.app
      </h1>

      {/* H2 com destaque secundário */}
      <h2
        className="text-blue-300 font-medium
                 text-xl sm:text-2xl lg:text-3xl max-w-3xl leading-snug"
      >
        Simplificando o dia a dia do médico e do estudante de medicina
      </h2>

      {/* Texto explicativo apenas em telas grandes */}
      <div className={`hidden ${isRegistring && "lg:block"} max-w-3xl`}>
        <p className="text-blue-200 text-base lg:text-lg leading-relaxed">
          Aqui você vai encontrar diversas ferramentas para facilitar o dia a dia, como resumos,
          receituários, remumes, bulário, bloco de notas e muito mais...
        </p>
      </div>
    </div>
  );
};

export default function HomePageContainer() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<null | { response: boolean; mensagem: string }>(null);

  ///effect para fazer chamada na api
  const usernameDebounced = useDebounce(input, 500);

  useEffect(() => {
    // clear when empty
    if (!usernameDebounced) {
      return;
    }

    // short inputs: don't call setState inside effect for validation — derive it in render
    if (usernameDebounced.length < 2) {
      return;
    }

    const controller = new AbortController();
    const callAPI = async () => {
      try {
        const res = await fetch(`/api/usuarios?query=${encodeURIComponent(usernameDebounced)}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          setResponse(null);
          return;
        }
        const canIRegister = (await res.json()) as { response: boolean; mensagem: string };
        setResponse(canIRegister);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("erro fetch usuarios:", err);
        setResponse(null);
      }
    };

    callAPI();
    return () => controller.abort();
  }, [usernameDebounced]);

  // derive validation message without causing cascading renders
  const validationResponse =
    usernameDebounced && usernameDebounced.length < 2
      ? { response: false, mensagem: "Pelo menos 2 caracteres são necessários" }
      : null;

  const displayResponse = validationResponse ?? response;

  const continerBaseClass = "flex flex-col w-full min-h-screen items-center bg-mt-primary";
  const isRegistring = displayResponse === null || displayResponse?.response === false;

  return (
    <div className={`${continerBaseClass} ${isRegistring ? "lg:flex-row" : ""}`}>
      <div className={`h-[30vh] w-full lg:w-3/5 ${isRegistring ? "lg:h-[80vh]" : ""} `}>
        <Hero isRegistring={isRegistring} />
      </div>
      <div className="lg:h-[80vh] w-full lg:w-2/5">
        <Login input={input} setInput={setInput} response={displayResponse} />
      </div>
    </div>
  );
}
