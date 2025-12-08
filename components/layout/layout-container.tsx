"use client";

import { useEffect, useState } from "react";

import MainFooter from "./main-footer/main-footer";
import MainHeader from "./main-header/main-header";
import SideMenu from "./main-sidebar/main-sidebar";

export default function LayoutContainer({ children, nome, userNameSlug, session }) {
  const [modalMenu, setModalMenu] = useState(false);

  ///solução do gpt, fazer effect para detectar o resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 992) {
        // Bootstrap 'lg' breakpoint = 992px
        setModalMenu(false);
      }
    }

    window.addEventListener("resize", handleResize);

    // Executar imediatamente para corrigir se já carregou grande
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-[56px]">
        <MainHeader
          nome={nome}
          openModal={() => setModalMenu((current) => !current)}
          session={session}
        />
      </header>
      <main className="flex-1 bg-mt-bg min-h-0 overflow-y-auto">
        {modalMenu && (
          <SideMenu userName={userNameSlug} modal={true} closeModal={() => setModalMenu(false)} />
        )}
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-2/12">
            <SideMenu
              userName={userNameSlug}
              modal={false}
              closeModal={() => setModalMenu(false)}
            />
          </div>
          <div className="w-full lg:w-10/12 mx-auto px-2 md:px-8 max-w-screen-xl">{children}</div>
        </div>
      </main>
      <footer className="">
        <MainFooter />
      </footer>
    </div>
  );
}
