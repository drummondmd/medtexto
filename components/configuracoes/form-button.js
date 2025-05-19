'use client'

import { delteUserHandle } from "@/lib/handler-action"
import { redirect, useRouter } from "next/navigation";



export default function FormButton({ clickFunction, anotherClass, escrito,user,disabled }) {
    const route = useRouter()


    // async function deleteUser(){
    //     console.log("delete")
    // }
    // async function resetePass(){
    //     console.log("resete")
    // }



     function handleClick(clickFunction,user) {
        if(clickFunction === "deleteUser"){
            delteUserHandle(user)
        }
        ///fazer reset de pass depois, trocar senha somente de usuarios com email confirmados
        if(clickFunction === "resetePass"){
            route.push(`/${user.username}/auth/reset-password`)

        }


    }



    return (
        <>
            <button disabled={disabled} onClick={()=>handleClick(clickFunction,user)} className={`btn m-1 ${anotherClass}`}>{escrito}</button>
        </>


    )

}