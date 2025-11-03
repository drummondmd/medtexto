import classes from "./main-sidebar.module.css";
import NavLink from "./nav-link";

function ModalMenu({ closeModal, listItem }) {
  return (
    <div className="d-lg-none">
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1050 }}
        onClick={closeModal}
      >
        <div
          className={`${classes.sidebar} d-lg-none rounded bg-light p-2 mt-4`}
          style={{ width: "250px", height: "100%", overflowY: "auto" }}
          onClick={(e) => e.stopPropagation()}
        >
          {listItem}
        </div>
      </div>
    </div>
  );
}

export default function SideMenu({ userName, modal, closeModal }) {
  const listItem = (
    <ul className="nav flex-column nav nav-pills nav-fill">
      <NavLink href={`/${userName}/home`} name={"Início"} />
      <NavLink href={`/${userName}/bloco-de-notas`} name={"Bloco de Notas"} />
      <NavLink href={`/${userName}/calculadoras`} name={"Calculadoras"} />
      <NavLink href={`/${userName}/receituarios`} name={"Receituarios"} />
      <NavLink href={`/${userName}/evolucoes`} name={"Evoluções"} />
      <NavLink href={`/${userName}/resumos`} name={"Resumos"} />
      <NavLink href={`/${userName}/perfil-e-configuracoes`} name={"Definições/Preferências"} />

      {/* <li className="nav-item p-2"><Link  href={`/${userName}/resumos`}>Calculador de infusões</Link></li> */}
      {/* <li className="nav-item p-2">Publicidade</li> */}
    </ul>
  );

  return (
    <>
      {modal && <ModalMenu closeModal={closeModal} listItem={listItem} />}
      <div className={`col-lg-2 d-none d-lg-block`}>
        <div className={`${classes.sidebar} p-2 mt-4`}>{listItem}</div>
      </div>
    </>
  );
}
