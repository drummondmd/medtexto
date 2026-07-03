"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function CarouselHero({ index }) {
  return (
    /* Estrutura conceitual de UM slide */
    <div className="embla__slide relative h-80 w-full bg-gradient-to-r from-blue-50 to-white rounded-xl overflow-hidden flex items-center">
      {/* LADO ESQUERDO: O PITCH (Texto + CTA) */}
      <div className="w-1/2 p-8 z-10 flex flex-col justify-center">
        <h3 className="text-3xl font-bold text-slate-800 mb-3">Adeus, receitas ilegíveis.</h3>
        <p className="text-lg text-slate-600 mb-6">
          Use a câmera para escanear prescrições. Nossa IA transcreve para seu bloco em segundos.
        </p>
        <div>
          <Button size="lg" className="bg-blue-600 text-white">
            Testar Scanner Agora
          </Button>
        </div>
      </div>

      {/* LADO DIREITO: A PROVA VISUAL (Imagem Composta) */}
      <div className="w-1/2 h-full relative">
        {/* Use o Next/Image aqui com 'object-contain' ou 'object-cover' */}
        {/* A imagem em si já deve ser a composição do "antes e depois" ou o mockup do celular */}
        <Image
          src="/logo.png"
          alt="Exemplo de digitalização de receita"
          fill
          className="object-contain object-right p-4" // Ajuste para a imagem não cortar
          priority={index === 0} // Prioridade se for o primeiro slide
        />
      </div>
    </div>
  );
}
