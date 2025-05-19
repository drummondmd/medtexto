'use client'

import { CircularProgress } from "@mui/material"

export default function Loading(){
    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100"  >
            <CircularProgress size="10rem"/>
            <p className="mt-3 h2" >Carregando informações...</p>

        </div>
    )
}