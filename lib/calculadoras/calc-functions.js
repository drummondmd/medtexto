import * as geral from "./logica/geral"
import * as nefro from "./logica/nefro"
import * as cardio from "./logica/cardio"
import * as pneumo from "./logica/pneumo"
import * as neuro from   "./logica/neuro"
import * as gastro from "./logica/gastro"
import * as hemato from "./logica/hemato"


///rever logica do meldSodio depois
export const funcoesCalculadoras={
    ...geral,
    ...nefro,
    ...cardio,
    ...pneumo,
    ...neuro,
    ...gastro,
    ...hemato
}