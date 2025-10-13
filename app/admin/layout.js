// app/admin/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export const metadata = {
  title: 'Admin | MedTexto',
};

export default function AdminLayout({ children }) {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 col-md-2 d-none d-md-block">
        <h5>Painel Admin</h5>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <Link className="nav-link text-white" href="/admin">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" href="/admin/calculadoras">Calculadoras</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" href="/admin/usuarios">Usuários</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" href="/admin/contatos">Contatos</Link>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-light px-4">
          <span className="navbar-brand mb-0 h5">Administração</span>
        </nav>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
