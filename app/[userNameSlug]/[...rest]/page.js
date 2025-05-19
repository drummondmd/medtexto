export default async function NotFound({params}) {

    const {userNameSlug} = await params

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100"  >
            <p className="mt-3 h2" >Conteúdo não encontrado<br />verifique endereço</p>
            <a href={`/${userNameSlug}`}> Voltar para Home</a>

        </div>
    )



}