'use client'

import { upadteHomepage } from "@/lib/databases/handler-pgdb";

    export default function FormSelect({user}){


    const recursos = ["/home","/passometros","/bloco-de-notas","/calculadoras","/receituarios","/resumos",];
    const atual = user.homepage?user.homepage:"/home"

    function changeSelect(e,user){
        const homepage = e.target.value;
        upadteHomepage(user,homepage)

    }

    return(
        <select className="form-select" defaultValue={atual} onChange={(e)=>changeSelect(e,user)}>
            {recursos.map((elem)=><option key={elem} value={elem}>{elem}</option>)}
    </select>
    )

}