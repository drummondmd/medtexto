import ReceitaParaTexto from "@/components/receituarios/receituario-transforma/receita-para-texto";

export default function Page() {
  return (
    <div className="container mx-auto px-4">
      <h6 className="display-6 my-2">Receita para Texto</h6>
      <div>
        <ReceitaParaTexto />
      </div>
    </div>
  );
}
