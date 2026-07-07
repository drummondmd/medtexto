"use client";

import TextoParaReceita from "./texto-para-receita";

export default function RecTrasformaGrid({ userId }: { userId: string }) {
  return (
    <div className="mt-5 mt-lg-2">
      <TextoParaReceita userId={userId} />
    </div>
  );
}
