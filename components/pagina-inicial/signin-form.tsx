"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm({ userNameSlug }) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const res = await signIn("credentials", {
      redirect: false,
      username: userNameSlug,
      password,
    });

    setIsLoading(false);

    if (res.ok) {
      router.push(`/${userNameSlug}`);
    } else {
      setErrorMessage("Credenciais inválidas. Verifique sua senha.");
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm text-center"
        style={{ maxWidth: "300px", margin: "10vh auto" }}
      >
        {errorMessage && <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>}

        <label className="form-label">
          Usuário
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Usuário"
            value={userNameSlug}
            readOnly
          />
        </label>

        <label className="form-label">
          Senha
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-100"
          style={{ marginTop: "10px" }}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <div className="mt-3">
          <Link href={`/${userNameSlug}/auth/reset-password`} className="text-muted d-block">
            Esqueceu a senha?
          </Link>
          <Link href="/" className="text-muted">
            Criar ou acessar conta diferente
          </Link>
        </div>
      </form>
    </div>
  );
}
