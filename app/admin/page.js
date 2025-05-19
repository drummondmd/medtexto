// app/admin/dashboard/page.js
'use client';

import { getCalculadoras } from '@/lib/databases/handler-mongodb';
import { getLoginStats } from '@/lib/databases/handler-pgdb';
import { useEffect, useState } from 'react';


export default function DashboardAdminPage() {
  const [usuarios, setUsuarios] = useState({});
  const [calculadoras, setCalculadoras] = useState({ total: 0 });
  const [maisUsadas, setMaisUsadas] = useState([]);
  const [localizacoes, setLocalizacoes] = useState([]);

  useEffect(() => {

    async function carregarEstatisticas() {
      const { total, resumo, localizacoes } = await getLoginStats()
      //   const statsUsuarios = await getUsuariosStats();
      const calculadoras = await getCalculadoras();
      //   setUsuarios(statsUsuarios);
      setCalculadoras({ total: calculadoras.length });

      // Simulados - substituir por lógica real quando possível
      setMaisUsadas([
        { titulo: 'IMC', acessos: 112 },
        { titulo: 'CKD-EPI', acessos: 87 },
        { titulo: 'MELD-Na', acessos: 74 },
      ]);

      setLocalizacoes(localizacoes);
      setUsuarios({ ...total, ...resumo })
    }
    carregarEstatisticas();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Dashboard Administrativo</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-bg-primary mb-3">
            <div className="card-header"> Total de Usuários</div>
            <div className="card-body">
              <h5 className="card-title">{usuarios.count}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-primary mb-3">
            <div className="card-header"> Acessos</div>
            <div className="card-body">
              <p className="card-text">
                Hoje: {usuarios.acessos_dia || 0} <br />
                Semana: {usuarios.acessos_mes || 0} <br />
                Mês: {usuarios.acessos_ano || 0}
              </p>
            </div>
          </div>
        </div>


        <div className="col-md-4">
          <div className="card text-bg-success mb-3">
            <div className="card-header">Calculadoras</div>
            <div className="card-body">
              <h5 className="card-title">{calculadoras.total}</h5>
              <p className="card-text">Total cadastradas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
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
      </div>
    </div>
  );
}
