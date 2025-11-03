import Link from "next/link";

import classes from "./notas.module.css";

export default function NotasResumos({ titulo, conteudo, userNameSlug, notaId, cadernoId }) {
  if (conteudo.length > 395) {
    conteudo = conteudo.slice(0, 395).concat("...");
  }

  return (
    <>
      <div className={`col-lg-5 m-2 ${classes.card}`}>
        <Link href={`/${userNameSlug}/resumos/${cadernoId}/notas/${notaId}`}>
          <div className={classes.notas}>
            <div className="p-2">
              <span className={classes.titulo}>{titulo}</span>
            </div>
            <div className="p-2">
              <span className={classes.conteudo}>{conteudo}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
