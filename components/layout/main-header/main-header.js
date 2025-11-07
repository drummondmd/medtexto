import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import classes from "./main-header.module.css";

export default function MainHeader({ nome, openModal, session }) {
  return (
    <>
      <header className={classes.header}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div>
              <div className="d-lg-none">
                <span onClick={openModal} className="navbar-toggler-icon"></span>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <Link className="navbar-brand" href="/">
                <Image
                  src="/logo.png"
                  alt=""
                  height="24"
                  width="24"
                  className="d-inline-block align-text-top"
                ></Image>
                MedTexto
              </Link>
            </div>

            {/* <div><input className="form-control me-2" type="text" name="" id="" placeholder="Barra de pesquisa fácil" />
                        </div> */}
            <div className="d-none d-lg-block">
              <span className="navbar-text"> {nome}</span>
              {session && (
                <Link
                  title={"Sair"}
                  href="/api/auth/signout"
                  role="buttom"
                  className="btn mx-4 navbar-text focus:border-blue-400"
                >
                  <LogOut />
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
