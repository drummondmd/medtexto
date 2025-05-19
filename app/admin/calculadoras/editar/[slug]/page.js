// app/admin/calculadoras/editar/[slug]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCalculadora, getCalculadoras, updateCalculadora } from '@/lib/databases/handler-mongodb';


export default function EditarCalculadoraPage() {
    const router = useRouter();
    const params = useParams();
    const { slug } = params;

    const [form, setForm] = useState(null);
    const [todasCalculadoras, setTodasCalculadoras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const calcAtual = await getCalculadora(slug);
                const todas = await getCalculadoras();
                setForm({
                    ...calcAtual,
                    entradas: calcAtual.entradas || [],
                    referencias: calcAtual.referencias || [],
                    calculadorasRelacionadas: calcAtual.calculadorasRelacionadas?.map(id => id.toString()) || []
                });
                setTodasCalculadoras(todas);
            } catch (err) {
                console.error("Erro ao carregar calculadora:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectRelacionadas = (e) => {
        const options = Array.from(e.target.options);
        const selecionados = options.filter(o => o.selected).map(o => o.value);
        setForm(prev => ({ ...prev, calculadorasRelacionadas: selecionados }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateCalculadora(slug, form)
            if (res) {
                router.push('/admin/calculadoras');
            } else {
                console.error('Erro ao atualizar calculadora');
            }
        } catch (err) {
            console.error('Erro:', err);
        }
    };

    if (loading || !form) return <p>Carregando...</p>;

    return (
        <div>
            <h2>Editar Calculadora</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input name="titulo" className="form-control" value={form.titulo} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea name="descricao" className="form-control" value={form.descricao} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Instruções</label>
                    <textarea name="instrucoes" className="form-control" value={form.instrucoes} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input name="slug" className="form-control" value={form.slug} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Function Logic</label>
                    <input name="functionLogic" className="form-control" value={form.functionLogic} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Evidência</label>
                    <input name="evidencia" className="form-control" value={form.evidencia} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Entradas (JSON)</label>
                    <textarea
                        name="entradas"
                        className="form-control"
                        rows={4}
                        value={JSON.stringify(form.entradas, null, 2)}
                        onChange={(e) => setForm(prev => ({ ...prev, entradas: JSON.parse(e.target.value || '[]') }))}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Referências (JSON)</label>
                    <textarea
                        name="referencias"
                        className="form-control"
                        rows={3}
                        value={JSON.stringify(form.referencias, null, 2)}
                        onChange={(e) => setForm(prev => ({ ...prev, referencias: JSON.parse(e.target.value || '[]') }))}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Calculadoras Relacionadas</label>
                    <select
                        multiple
                        className="form-control"
                        value={form.calculadorasRelacionadas}
                        onChange={handleSelectRelacionadas}
                    >
                        {todasCalculadoras.filter(c => c.slug !== slug).map(calc => (
                            <option key={calc._id} value={calc._id}>{calc.titulo}</option>
                        ))}
                    </select>
                    <small className="text-muted">Segure Ctrl (ou Cmd no Mac) para selecionar múltiplas</small>
                </div>

                <button className="btn btn-primary" type="submit">Atualizar</button>
            </form>
        </div>
    );
}
