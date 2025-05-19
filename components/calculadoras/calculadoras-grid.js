'use client'
import { useState } from "react"
import classes from "./calculadoras-grid.module.css"
import Link from "next/link"
import { usePathname } from 'next/navigation'


export default function CalculadorasGrid({ data }) {
    data = JSON.parse(data)
    const pathname = usePathname()
    const [exibicao, setExibicao] = useState(data);

    function onSearch(e) {
        const input = e.target.value
        let searchResult = data.filter((elem) => elem.titulo.toLowerCase().includes(input.toLowerCase())||elem.descricao.toLowerCase().includes(input.toLowerCase()));
        setExibicao(searchResult)
    }



    return (
        <>
            <div className="container">
                <h6 className="display-6 my-2">Calculadoras</h6>
                <div className="my-2"><input className="form-control" placeholder="Digite nome da formula" onChange={onSearch}></input></div>
                {/* Favoritos, populares depois, mostrando todas inicialmente */}
                {/* <div className="my-2 mx-5">
                    <div className="btn mx-2" role="buttom">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </div>
                        <div>
                            Populares
                        </div>
                    </div>
                    <div className="btn mx-2" role="buttom">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                            </svg>
                        </div>
                        <div>
                            Favoritas
                        </div>
                    </div>
                    <div className="btn mx-2" role="buttom">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar4-event" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </div>
                        <div>
                            Novidades
                        </div>
                    </div>
                    <div className="btn mx-2" role="buttom">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-database" viewBox="0 0 16 16">
                                <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313M13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A5 5 0 0 0 13 5.698M14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A5 5 0 0 0 13 8.698m0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525" />
                            </svg>
                        </div>
                        <div>
                            Todas calculadoras
                        </div>
                    </div>


                </div> */}
                <div>
                    <ul className={classes.calcList}>
                        <div className="row">
                            {(exibicao.length === 0) && <li>Nenhuma calculadora encontrada</li>}
                            {exibicao.map((elem) => {
                                return (
                                    <li key={elem["_id"]} className="col-md-6"><Link href={pathname + "/" + elem.slug} >
                                        <div className="card m-2">
                                            <div className="card-body">
                                                <h6 className="card-title"> {elem.titulo} </h6>
                                                <p className="card-text">{elem.descricao}</p>

                                            </div>
                                        </div>
                                    </Link></li>

                                )
                            })}


                        </div>


                    </ul>
                </div>



            </div>


        </>

    )
}