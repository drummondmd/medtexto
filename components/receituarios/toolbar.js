import { noteHandle } from "@/lib/handler-action"

export default function ToolbarRecEv({resource,user,selected}){


    return(
        <div className="d-flex justify-content-end mb-2 mt-4 ">
        <div role="buttom" className="btn btn-outline-dark mx-1" onClick={()=> navigator.clipboard.writeText(selected.conteudo)}>Copiar</div>
        <div onClick={()=>noteHandle("delete",resource,user,selected)} role="buttom" className=" mx-1 btn btn-outline-danger">Deletar</div>
        <div onClick={()=>noteHandle("update",resource,user,selected)} className="mx-1 btn btn-outline-primary" role="buttom">Salvar</div>
        </div>
    )
}