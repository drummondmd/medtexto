"use client";

import { useEffect, useRef, useState } from "react";

import OcrControl from "@/components/features/bloco-de-notas/ocr-control";
import useApiMutator from "@/components/hooks/useApiMutation";
import { NoteData } from "@/lib/databases/handler-mongodb";

import TextArea from "./text-area";
import TextControl from "./text-control";

type Props = {
  userId: string;
  initialState: string;
  canMutateData: boolean;
  variant: "small" | "large";
  dataForArray?: NoteData;
  resource: string;
  apiUpdateFunction: any;
  canOCR: boolean;
};

export default function TextAreaWControlContainer({
  userId,
  canOCR = false,
  initialState,
  canMutateData,
  dataForArray,
  resource,
  variant,
  apiUpdateFunction,
}: Props) {
  ///states
  const [textState, setTextState] = useState<string>(initialState);
  const textAreaRef = useRef(null);

  const { executeMutation, status, setFeedback } = useApiMutator(apiUpdateFunction, "Salvo");

  ///ajuste altura
  function ajustarAltura() {
    const ta = textAreaRef.current;
    if (!ta) return;
    ta.style.height = "auto"; // limpa tamanho anterior
    ta.style.height = `${ta.scrollHeight}px`; // ajusta à altura do conteúdo
  }

  // Ajusta ao montar e quando valorInicial muda
  useEffect(() => {
    ajustarAltura();
  }, [initialState]);

  ///onChangeInput
  function onChangeInput(e: any) {
    ajustarAltura();
    setTextState(e.target.value);
  }

  async function onCopyText() {
    try {
      await navigator.clipboard.writeText(textState);

      // 🚨 AQUI: Chame a nova função para dar feedback
      setFeedback(true, "Copiado!");
    } catch (err) {
      console.error(err);
      setFeedback(false, "Erro ao copiar!");
    }
  }

  ///changeCase
  const onUpperCase = () => {
    setTextState((prev) => prev.toUpperCase());
  };

  const onLowerCase = () => {
    setTextState((prev) => prev.toLowerCase());
  };

  const onFirstUpperCase = () => {
    setTextState((prev) => {
      // let newInput = input.replace(input[0],input[0].toUpperCase())
      const array = prev.split("\n");
      const arrayFirstUpperCase = [];

      array.forEach((linha: string) => {
        if (linha.length > 1) {
          arrayFirstUpperCase.push(linha.replace(linha[0], linha[0].toUpperCase()));
        } else {
          arrayFirstUpperCase.push(linha);
        }
      });

      const newInput = arrayFirstUpperCase.join("\n");

      return newInput;
    });
  };

  const onDelete = async () => {
    if (canMutateData) {
      executeMutation(userId, "", dataForArray, resource);
    }
    setTextState("");
  };

  async function onSave() {
    executeMutation(userId, textState, dataForArray, resource);
  }

  return (
    <div
      className={
        variant === "small" ? "my-1 px-1 mx-auto max-w-full" : "my-3 px-4 mx-auto max-w-full"
      }
    >
      {canOCR && <OcrControl state={textState} onChangeFunction={setTextState} />}
      <TextControl
        status={status}
        onDelete={onDelete}
        onSave={onSave}
        onFirstUpperCase={onFirstUpperCase}
        onLowerCase={onLowerCase}
        onUpperCase={onUpperCase}
        onCopyText={onCopyText}
        canPersistData={canMutateData}
        variant={variant}
      />
      <TextArea
        textState={textState}
        textAreaRef={textAreaRef}
        onChangeInput={onChangeInput}
        variant={variant}
      />
    </div>
  );
}
