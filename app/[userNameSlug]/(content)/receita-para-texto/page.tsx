import ReceitaParaTexto from "@/components/receituarios/receituario-transforma/receita-para-texto";
import TitleHeader from "@/components/ui/titleHeader";

export default function Page() {
  return (
    <div className="flex flex-wrap">
      <TitleHeader title={"Receita para Texto"} />

      <ReceitaParaTexto />
    </div>
  );
}
