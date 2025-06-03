import classes from "./main-footer.module.css"
import myPackage from "@/package.json"

export default function MainFooter(){

    const {version} = myPackage


    const today = new Date()
    const year = today.getFullYear()



    return(
        <>
    <footer className={classes.footer +" "+  "d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top"}>

<div className="col-md-3 d-flex align-items-center">
    {/* <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        Logo
    </a> */}
    <span className="mb-3 mb-md-0 text-body-secondary">Todos os direitos reservados. Copyright© {year}  </span>
</div>
<div className="col-md-3 d-flex align-items-center justify-content-center">
     <span className="mb-3 mb-md-0 text-body-secondary">Versão Beta: {version}</span>
    {/* <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">

        <span className="mb-3 mb-md-0 text-body-secondary">Elaborado por:(SVG) Angelin Digital.</span>
    </a> */}
</div>
{/* <ul className="nav col-md-4 justify-content-center list-unstyled d-flex">
    <li className="ms-3"><a className="text-body-secondary">Insta</a></li>
    <li className="ms-3"><a className="text-body-secondary">Outros</a></li>
</ul> */}

</footer>

        </>
    )
}