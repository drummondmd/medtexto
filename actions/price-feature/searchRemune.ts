import { remuneIndex, RemuneStructure } from "@/data/remune/remuneIndex";
import retirarAcentos from "@/lib/helpers/retirarAcentos";

export default function searchRemune(
  remuneKey: string,
  med: string,
  _dosagem?: string,
  _classeT?: string
): { temRemune: boolean | undefined; alternatives?: string[] } {
  if (!med || !remuneKey) return { temRemune: undefined };
  const remune = remuneIndex[remuneKey] as RemuneStructure;
  if (!remune) return { temRemune: undefined };
  const filtered = remune.remuneData.filter((item) =>
    retirarAcentos(item.descricao).includes(retirarAcentos(med))
  );
  if (filtered.length === 0) {
    return { temRemune: false, alternatives: [] };
  } else {
    return { temRemune: true };
  }
}
