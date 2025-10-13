'use client'

import { delteUserHandle } from "@/lib/handler-action"
import { useRouter } from "next/navigation";



export default function FormButton({ clickFunction, anotherClass, escrito,user_id,username,disabled }) {
    const route = useRouter()


    // async function deleteUser(){
    //     console.log("delete")
    // }
    // async function resetePass(){
    //     console.log("resete")
    // }



     function handleClick(clickFunction,user_id) {
        if(clickFunction === "deleteUser"){
            delteUserHandle(user_id)
        }
        ///fazer reset de pass depois, trocar senha somente de usuarios com email confirmados
        if(clickFunction === "resetePass"){
            route.push(`/${username}/auth/reset-password`)

        }


    }



    return (
        <>
            <button disabled={disabled} onClick={()=>handleClick(clickFunction,user_id)} className={`btn m-1 ${anotherClass}`}>{escrito}</button>
        </>


    )

}