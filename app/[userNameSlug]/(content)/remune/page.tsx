import RemuneContainer from "@/components/features/remune/remune-container";
import TitleHeader from "@/components/ui/titleHeader";
import remunePBH from "@/data/30-06-25-smsa-remume-2024(normalizado).json";

export default function Page() {
  const bh = { cidade: "Belo Horizonte", ano: "2025", remuneData: remunePBH };
  //const contagem = { cidade: "Contagem", ano: "2025", remuneData: remuneContagem }

  const remunesArray = [bh];
  return (
    <div className="mt-4">
      <TitleHeader title={"Remune"} />
      <RemuneContainer remunesArray={remunesArray} />
    </div>
  );
}
