type SelectInputs = {
    tipo: "radio",
    nome: string,
    displayNome?:string,
    value: string | number
    isDefault: boolean


}

type EntradaType = {
    nome: string,
    displayNome?: string,
    inputType: "input" | "select" | "radio",
    tipo: string
    unidade?: string | undefined,
    placeholder?: string,
    obs?: string
    entradas?: SelectInputs[]

}

type ReferenciaCalc = {
    titulo: string,
    descricao: string,
    link: string

}

export type CalculadoraEstrutura = {
    id: string,
    titulo: string,
    descricao: string,
    instrucoes: string,
    entradas: EntradaType[]
    evidencia: string,
    referencias: ReferenciaCalc[] | undefined
    slug: string,
    functionLogic: string
    calculadorasRelacionadas: Array<{ id: string }| null>

}