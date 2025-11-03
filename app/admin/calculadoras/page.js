// app/admin/calculadoras/page.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getCalculadoras } from "@/lib/databases/handler-mongodb";

export default function CalculadorasAdminPage() {
  const [calculadoras, setCalculadoras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      ///mudar para rota atual depois
      try {
        const res = await getCalculadoras();
        const parsed = res.map((c) => ({
          ...c,
          _id: c._id?.toString(),
          calculadorasRelacionadas:
            c.calculadorasRelacionadas?.map((rel) => ({
              ...rel,
              _id: rel._id?.toString(),
            })) || [],
        }));
        setCalculadoras(parsed || []);
      } catch (err) {
        console.error("Erro ao buscar calculadoras:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Calculadoras</h2>
        <Link href="/admin/calculadoras/nova" className="btn btn-primary">
          + Nova Calculadora
        </Link>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Slug</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {calculadoras.map((calc) => (
              <tr key={JSON.stringify(calc._id)}>
                <td>{calc.titulo}</td>
                <td>{calc.slug}</td>
                <td>
                  <Link
                    href={`/admin/calculadoras/editar/${calc.slug}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Editar
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(calc.slug)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  async function handleDelete(slug) {
    if (!confirm("Tem certeza que deseja excluir esta calculadora?")) return;
    try {
      const res = await fetch(`/api/calculadoras/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setCalculadoras((prev) => prev.filter((c) => c.slug !== slug));
      }
    } catch (error) {
      console.error("Erro ao excluir calculadora:", error);
    }
  }
}
