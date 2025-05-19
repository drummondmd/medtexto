'use client'

import MainHeader from "./main-header/main-header";
import SideMenu from "./main-sidebar/main-sidebar";
import classes from "./layout.module.css";
import { useEffect, useState } from "react";
import MainFooter from "./main-footer/main-footer";

export default function MainLayout({ children, nome, userNameSlug,session }) {
    const [modalMenu, setModalMenu] = useState(false)


    ///solução do gpt, fazer effect para detectar o resize
    useEffect(() => {
        function handleResize() {
          if (window.innerWidth >= 992) { // Bootstrap 'lg' breakpoint = 992px
            setModalMenu(false);
          }
        }

        window.addEventListener('resize', handleResize);

        // Executar imediatamente para corrigir se já carregou grande
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (

        <>
            <MainHeader nome={nome} openModal={() => setModalMenu(current => !current)} session={session} />
            {/* Definindo background manual, trocar depois */}
            <main className={classes.main}>
                {modalMenu && <SideMenu userName={userNameSlug} modal={true} closeModal={() => setModalMenu(false)} />}
                <div className="row">
                    <SideMenu userName={userNameSlug} />
                    <div className='col-lg-10'>
                        {children}
                    </div>
                </div>
            </main>
            <MainFooter />
        </>

    )


}