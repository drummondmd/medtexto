'use client'

import { resetPassAction } from "@/actions/auth/resetPassAction";
import { useActionState } from "react"

export function ResetPassForm({ userDetail }) {
    const [state, formAction, isPending] = useActionState(resetPassAction, {});

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-12">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4">Recuperação de Senha</h3>

                            <div className="alert alert-info mb-4">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-info-circle-fill me-2"></i>
                                    <div>
                                        <p className="mb-1"><strong>Usuário:</strong> {userDetail.username}</p>
                                        <p className="mb-0">Um link para redefinir sua senha será enviado ao e-mail informado abaixo.</p>
                                    </div>
                                </div>
                            </div>

                            <form action={formAction}>
                                {state.erro && (
                                    <div className="alert alert-danger" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {state.erro}
                                    </div>
                                )}

                                {state.status && (
                                    <div className="alert alert-success" role="alert">
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        {state.status}
                                    </div>
                                )}

                                <input name="username" value={userDetail.username} readOnly hidden />
                                <input name="userId" value={userDetail.id} readOnly hidden />

                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label fw-semibold">E-mail para recuperação</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input
                                            required
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="Digite seu e-mail"
                                            defaultValue={state.payload && state.payload.get("email")}
                                        />
                                    </div>
                                    <div className="form-text">Informe o e-mail associado à sua conta.</div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Enviando...
                                            </>
                                        ) : (
                                            'Enviar Link de Recuperação'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>


    );
}
