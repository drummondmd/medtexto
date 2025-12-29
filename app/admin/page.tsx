// app/admin/dashboard/page.js

import { estruturaCalculadoras } from "@/lib/calculadoras/calc-estrutura";
import { getLoginStats } from "@/lib/databases/handler-pgdb";

type LoginStatsResult = {
  total: { count: string };
  resumo: { acessos_ano: string; acessos_dia: string; acessos_mes: string };
  localizacoes: any[];
};

export default async function DashboardAdminPage() {
  const calculadoras = estruturaCalculadoras;

  const { total, resumo } = (await getLoginStats()) as LoginStatsResult;

  return (
    <div>
      <h2 className="mb-4">Dashboard Administrativo</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-bg-primary mb-3">
            <div className="card-header"> Total de Usuários</div>
            <div className="card-body">
              <h5 className="card-title">{total?.count}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-primary mb-3">
            <div className="card-header"> Acessos</div>
            <div className="card-body">
              <p className="card-text">
                Hoje: {resumo?.acessos_dia || 0} <br />
                Semana: {resumo?.acessos_mes || 0} <br />
                Mês: {resumo?.acessos_ano || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-bg-success mb-3">
            <div className="card-header">Calculadoras</div>
            <div className="card-body">
              <h5 className="card-title">{calculadoras.length}</h5>
              <p className="card-text">Total cadastradas</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Mais utilizadas</div>
            <ul className="list-group list-group-flush">
              {maisUsadas.map((c, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between">
                  {c.titulo} <span className="badge bg-primary">{c.acessos}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Localização dos acessos</div>
            <ul className="list-group list-group-flush">
              {localizacoes.map((l, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between">
                  {l.cidade} <span className="badge bg-secondary">{l.acessos}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
}
