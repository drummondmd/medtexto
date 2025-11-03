"use client";

import { CircularProgress } from "@mui/material";
import { Camera, Upload } from "lucide-react";
import { SetStateAction, useRef, useState } from "react";
import { createWorker } from "tesseract.js";

import recToTexFunction from "@/actions/receituarios/rec-to-text-function";

import classes from "./bloco-de-notas.module.css";

export default function OcrControl({
  state,
  onChangeFunction,
}: {
  state: string;
  onChangeFunction: (value: SetStateAction<string>) => void;
}) {
  const [file, setFile] = useState<File>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [process, setProcess] = useState<{ isSelected?: boolean; ok: boolean; message?: string }>({
    ok: true,
  });

  const hiddenFileInput = useRef(null); // Create a ref for the hidden input
  const hiddenFileInput2 = useRef(null); // Create a ref for the hidden input

  const onSelectFile = (e) => {
    const file = e.target.files[0] as File;
    if (file.type.includes("image/")) {
      setFile(e.target.files[0]);
      setProcess({ isSelected: true, ok: true, message: undefined });
    } else {
      setProcess({ isSelected: false, ok: false, message: "Arquivo não compativel" });
    }
  };

  const onSubmit = async (e) => {
    if (!file) {
      alert("Selecione arquivo");
      return;
    }
    setIsLoading(true);
    setProcess({ ok: true });
    const route = e.target.id as "texto" | "receita";
    const worker = await createWorker("por");
    const ret = await worker.recognize(file);
    await worker.terminate();
    if (ret.data.confidence <= 75) {
      setIsLoading(false);
      setProcess({ ok: false, message: "Texto não reconhecido ou imagem de baixa qualidade" });
    } else {
      if (route === "receita") {
        const transformed = await recToTexFunction(ret.data.text);
        if (transformed.success) {
          onChangeFunction(state + "\n" + transformed.output);
        } else {
          onChangeFunction(state + "\n" + ret.data.text);
        }
      }
      if (route === "texto") {
        onChangeFunction(state + "\n" + ret.data.text);
      }
      setIsLoading(false);
      setProcess({ ok: true });
    }
  };

  return (
    <div className={`my-3 p-2 ${classes.control}`} onClick={(e) => e.stopPropagation()}>
      <div className="d-inline mx-2 p-2 border-right border-dark">OCR</div>
      <div title="Adicionar foto" className="d-inline mx-2 p-2">
        <input
          type="file"
          accept=".jpg, .png, .gif"
          ref={hiddenFileInput} // Attach the ref to the input
          onChange={onSelectFile}
          style={{ display: "none" }} // Hide the default input
        />
        <Upload onClick={() => hiddenFileInput.current.click()} />
      </div>
      <div title="Adicionar foto" className="d-inline mx-2 p-2">
        <input
          capture="environment"
          type="file"
          accept=".jpg, .png, .gif"
          ref={hiddenFileInput2} // Attach the ref to the input
          onChange={onSelectFile}
          style={{ display: "none" }} // Hide the default input
        />
        <Camera onClick={() => hiddenFileInput2.current.click()} />
      </div>
      <div className="d-inline mx-2 p-2">{isLoading && <CircularProgress size={"1rem"} />}</div>
      <div className="d-inline mx-2 p-2">
        {process.isSelected && "Imagem Carregada"}
        {process.ok && process.message}
        {!process.ok && process.message}
      </div>
      <div
        role="button"
        title="Texto Simples"
        id="texto"
        className="d-inline mx-0 mx-md-2 p-2"
        onClick={onSubmit}
      >
        Texto
      </div>
      <div
        role="button"
        title="Receituario"
        id="receita"
        className="d-inline mx-0 mx-md-2 p-2"
        onClick={onSubmit}
      >
        Receituário
      </div>
    </div>
  );
}
