'use client'

import { usePathname } from "next/navigation";

export default function NotFound({ params }) {
    const pathname =  usePathname();
    const userNameSlug = pathname.split("/")[1]



    return (<div className="d-flex flex-column justify-content-center align-items-center min-vh-100"  >
        <p className="mt-3 h2" >Calculadora não encontrada<br />verifique endereço</p>
        <a href={`/${userNameSlug}/calculadoras`}> Voltar para as Calculadoras</a>

    </div>)
}