import bh2025 from "./30-06-25-smsa-remume-2024(normalizado).json";

export type RemuneStructure = {
  cidade: string;
  ano: string;
  remuneData: {
    item: number;
    descricao: string;
    nivel_atencao: string;
    local_acesso: string;
    classe: string;
  }[];
};
type data = { [key: string]: RemuneStructure };

export const remuneIndex: data = {
  bh: { cidade: "Belo Horizonte", ano: "2025", remuneData: bh2025 },
};
