"use client";

import { useActionState } from "react";

import { updateUserForm, createUserForm } from "@/lib/form-action";

export default function FormCompleto({ firstUser, userDetail, username }) {
  ////data adquirida pelo usuario sendo formatado errado e não colocando no display

  const action = firstUser ? createUserForm : updateUserForm;

  const [state, formAction, isPending] = useActionState(action, null);
  // const [selectRadio, setSelectRadio] = useState(false)

  ///transformando data para string para funcionar como default
  let stringDate;
  if (userDetail.data_nascimento) {
    stringDate = userDetail.data_nascimento;
    stringDate = stringDate.substring(0, 10);
  }

  return (
    <div className="container my-4 ">
      {isPending && <p>Enviando</p>}

      {state && <div>{state.mensagem}</div>}

      <form className="row g-3" action={formAction}>
        {firstUser ? (
          <>
            <div className="col-md-12">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={userName}
                readOnly
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                defaultValue={state ? state.payload.get("nome") : userDetail.nome}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Sobrenome</label>
              <input
                type="text"
                className="form-control"
                name="sobrenome"
                defaultValue={state ? state.payload.get("sobrenome") : userDetail.sobrenome}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                defaultValue={state ? state.payload.get("email") : userDetail.email}
              />
            </div>
          </>
        ) : (
          <>
            <input hidden name="user_id" defaultValue={userDetail.user_id}></input>
            <input hidden name="username" defaultValue={username}></input>
          </>
        )}

        {/* Data de Nascimento */}

        <div className="col-md-4">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            name="data_nascimento"
            defaultValue={state ? state.payload.get("data_nascimento") : stringDate}
          />
        </div>

        {/* Tipo de Usuário */}
        <div className="col-md-12">
          <label className="form-label">Tipo de Usuário</label>
          <select
            className="form-control"
            name="tipo_usuario"
            defaultValue={state ? state.payload.get("tipo_usuario") : userDetail.tipo_usuario}
          >
            <option value="">Selecione...</option>
            <option value="medico">Médico</option>
            <option value="estudante">Estudante de Medicina</option>
            <option value="outro">Outro Profissional ou Estudante</option>
          </select>
        </div>

        {/* Instituição de Ensino */}
        <div className="col-md-4">
          <label className="form-label">Instituição de Ensino</label>
          <input
            type="text"
            className="form-control"
            name="instituicao_ensino"
            defaultValue={
              state ? state.payload.get("instituicao_ensino") : userDetail.instituicao_ensino
            }
          />
        </div>

        {/* Ano de Formação */}
        <div className="col-md-4">
          <label className="form-label">Ano de Formação</label>
          <input
            type="number"
            className="form-control"
            name="ano_formacao"
            defaultValue={state ? state.payload.get("ano_formacao") : userDetail.ano_formacao}
          />
        </div>

        {/* Especialidade */}
        <div className="col-md-6">
          <label className="form-label">Especialidade</label>
          <input
            type="text"
            className="form-control"
            name="especialidade"
            defaultValue={state ? state.payload.get("especialidade") : userDetail.especialidade}
          />
        </div>

        {/* CRM */}
        <div className="col-md-4">
          <label className="form-label">CRM</label>
          <input
            type="text"
            className="form-control"
            name="crm"
            defaultValue={state ? state.payload.get("crm") : userDetail.crm}
          />
        </div>

        {/* Local de trabalho */}
        <div className="col-md-12">
          <label className="form-label">
            Local de trabalho(Se mais de 1, considere maior carga horária)
          </label>
          <input
            type="text"
            className="form-control"
            name="local_trabalho"
            defaultValue={state ? state.payload.get("local_trabalho") : userDetail.local_trabalho}
          />
        </div>

        {/* Telefone */}
        <div className="col-md-6">
          <label className="form-label">Telefone</label>
          <input
            type="tel"
            className="form-control"
            name="telefone"
            defaultValue={state ? state.payload.get("telefone") : userDetail.telefone}
          />
        </div>

        {/* Foto de Perfil */}
        {/* <div className="col-md-6">
    <label className="form-label">Foto de Perfil (URL)</label>
    <input type="text" className="form-control" name="foto_perfil_url" defaultValue={state ? state.payload.get("foto_perfil_url") : userDetail.foto_perfil_url} />
  </div> */}

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {firstUser ? "Cadastrar" : "Atualizar cadastro"}
          </button>
        </div>
      </form>
    </div>
  );
}
