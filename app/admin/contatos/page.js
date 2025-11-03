import { getContatos } from "@/actions/admin-actions/actions";

//página ainda muito crua, reformular depois se necessidade, só para facilitar leitura no momento
export default async function ContatosPage() {
  const contatos = await getContatos();

  return (
    <>
      {contatos.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Usuário</th>
                <th scope="col">Motivo</th>
                <th scope="col">Mensagem</th>
                <th scope="col">Data</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contatos.map((contato) => {
                // Formatar a data para um formato mais amigável
                const data = new Date(contato.data_envio);
                const dataFormatada =
                  data.toLocaleDateString("pt-BR") +
                  " " +
                  data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

                // Formatar o motivo para primeira letra maiúscula
                const motivoFormatado =
                  contato.motivo.charAt(0).toUpperCase() + contato.motivo.slice(1);

                return (
                  <tr key={contato.id}>
                    <td>{contato.user_name}</td>
                    <td>
                      <span className={`badge`}>{motivoFormatado}</span>
                    </td>
                    <td>
                      <div className="message-cell">{contato.mensagem}</div>
                    </td>
                    <td>{dataFormatada}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          title="Responder"
                          // onClick={() => handleResponder(contato)}
                        >
                          <i className="bi bi-reply"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          title="Excluir"
                          // onClick={() => handleExcluir(contato.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          Nenhum contato encontrado.
        </div>
      )}
    </>
  );
}
