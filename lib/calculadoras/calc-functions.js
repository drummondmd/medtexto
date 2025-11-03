import * as cardio from "./logica/cardio";
import * as gastro from "./logica/gastro";
import * as geral from "./logica/geral";
import * as hemato from "./logica/hemato";
import * as nefro from "./logica/nefro";
import * as neuro from "./logica/neuro";
import * as pneumo from "./logica/pneumo";

///rever logica do meldSodio depois
export const funcoesCalculadoras = {
  ...geral,
  ...nefro,
  ...cardio,
  ...pneumo,
  ...neuro,
  ...gastro,
  ...hemato,
};
