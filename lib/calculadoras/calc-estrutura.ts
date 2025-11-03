import { gastro } from "./estrutura/gastro";
import { geral } from "./estrutura/geral";
import { hemato } from "./estrutura/hemato";
import { nefro } from "./estrutura/nefro";
import { neuro } from "./estrutura/neuro";
import { pneumo } from "./estrutura/pneumo";

///rever logica do meldSodio depoiss
export const estruturaCalculadoras = [
  ...nefro,
  ...pneumo,
  ...geral,
  ...gastro,
  ...hemato,
  ...neuro,
];
