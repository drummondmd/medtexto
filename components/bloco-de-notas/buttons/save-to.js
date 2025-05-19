'use client'

import { useState } from "react";
import { updateBloco } from "@/lib/databases/handler-mongodb";


export default function SaveButton({ user, input,path }) {



    const after = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
        <path d="M11 2H9v3h2z" />
        <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
    </svg>
    const before = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-floppy2-fill" viewBox="0 0 16 16">
        <path d="M12 2h-2v3h2z" />
        <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
    </svg>

    const [icon, setIcon] = useState(after)

    async function onClickHandler(user, input,path) {
        ///mudando a depender de onde será salvo
        setIcon(before)
        if(path === "bloco"){
            const atualizar = await updateBloco(user, input)
        }
        setTimeout(() => setIcon(after), 200)
    }



    return (
        <div className="d-inline mx-2" onClick={() => onClickHandler(user, input,path)}>{icon}</div>
    )
}

