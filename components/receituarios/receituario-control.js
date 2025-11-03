export default function ReceituarioControl({ cadernos, clickHandler, newEntry, selected }) {
  return (
    <>
      <div className="row">
        <div className="col-md-2 text-center align-itens-center border-end">
          <button type="button" className="btn" onClick={newEntry}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
            <div>Novo</div>
          </button>
        </div>
        <div className="col-md-10">
          {cadernos.map((caderno) => {
            return (
              <button
                type="button"
                key={caderno["_id"]}
                onClick={(e) => clickHandler(e)}
                className={`btn m-1 ${caderno.titulo === selected.titulo ? "btn-secondary" : "btn-outline-secondary"}`}
                id={caderno["_id"]}
              >
                {caderno.titulo}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
