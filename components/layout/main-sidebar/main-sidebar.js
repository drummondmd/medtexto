import classes from "./main-sidebar.module.css";
import NavLink from "./nav-link";

function ModalMenu({ closeModal, listItem }) {
  return (
    <div className="lg:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 min-h-screen bg-black/50"
        style={{ zIndex: 1050 }}
        onClick={closeModal}
      >
        {/* Sidebar */}
        <div
          className="bg-white rounded p-2 mt-4"
          style={{
            width: "250px",
            height: "80%",
            overflowY: "auto",
          }}
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
      <NavLink href={`/${userName}/receita-para-texto`} name={"Receita para texto"} />
      <NavLink href={`/${userName}/desmame-corticoide`} name={"Desmame de Corticoide"} />
      <NavLink href={`/${userName}/evolucoes`} name={"Evoluções"} />
      <NavLink href={`/${userName}/resumos`} name={"Resumos"} />
      <NavLink href={`/${userName}/remune`} name={"Remune"} />
      <NavLink href={`/${userName}/perfil-e-configuracoes`} name={"Definições/Preferências"} />

      {/* <li className="nav-item p-2"><Link  href={`/${userName}/resumos`}>Calculador de infusões</Link></li> */}
      {/* <li className="nav-item p-2">Publicidade</li> */}
    </ul>
  );

  return (
    <>
      {modal && <ModalMenu closeModal={closeModal} listItem={listItem} />}
      {!modal && <div className={`${classes.sidebar} p-2 mt-4`}>{listItem}</div>}
    </>
  );
}
