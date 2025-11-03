// app/admin/calculadoras/nova/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NovaCalculadoraPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    instrucoes: "",
    slug: "",
    functionLogic: "",
    evidencia: "",
    entradas: [],
    referencias: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/calculadoras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/calculadoras");
      } else {
        console.error("Erro ao salvar calculadora");
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  return (
    <div>
      <h2>Nova Calculadora</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            name="titulo"
            className="form-control"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            name="descricao"
            className="form-control"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Instruções</label>
          <textarea
            name="instrucoes"
            className="form-control"
            value={form.instrucoes}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            name="slug"
            className="form-control"
            value={form.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Function Logic</label>
          <input
            name="functionLogic"
            className="form-control"
            value={form.functionLogic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Evidência</label>
          <input
            name="evidencia"
            className="form-control"
            value={form.evidencia}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Entradas (JSON)</label>
          <textarea
            name="entradas"
            className="form-control"
            rows={4}
            value={JSON.stringify(form.entradas, null, 2)}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, entradas: JSON.parse(e.target.value || "[]") }))
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Referências (JSON)</label>
          <textarea
            name="referencias"
            className="form-control"
            rows={3}
            value={JSON.stringify(form.referencias, null, 2)}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, referencias: JSON.parse(e.target.value || "[]") }))
            }
          />
        </div>

        <button className="btn btn-success" type="submit">
          Salvar
        </button>
      </form>
    </div>
  );
}
