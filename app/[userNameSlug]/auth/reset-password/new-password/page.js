'use client'

import { useParams, useSearchParams } from "next/navigation"
import { newPasswordAction } from "@/actions/auth/resetPassAction"
import { useActionState } from "react"
import Link from "next/link";

export default function NewPassword() {
    const { userNameSlug } = useParams();
    const token = useSearchParams().get("token")

    const [state, formAction, isPending] = useActionState(newPasswordAction, {})


return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4">Redefinição de Senha</h3>

                            <div className="alert alert-info mb-4">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-shield-lock me-2"></i>
                                    <div>
                                        <p className="mb-0">Digite sua nova senha.</p>
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

                                {state.link && (
                                    <div className="alert alert-success" role="alert">
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        <Link href={state.link} className="alert-link">Clique aqui para concluir a redefinição de senha</Link>
                                    </div>
                                )}

                                {isPending && (
                                    <div className="alert alert-warning" role="alert">
                                        <div className="d-flex align-items-center">
                                            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                            <span>Enviando, aguarde um momento...</span>
                                        </div>
                                    </div>
                                )}

                                <input name="username" value={userNameSlug} hidden readOnly />
                                <input name="token" value={token} hidden readOnly />

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">Nova senha:</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-key"></i>
                                        </span>
                                        <input
                                            id="password"
                                            className="form-control form-control-lg"
                                            type="password"
                                            minLength={6}
                                            name="password"
                                            placeholder="Digite sua nova senha"
                                            required
                                        />
                                    </div>
                                    <div className="form-text">A senha deve ter no mínimo 6 caracteres.</div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="passwordConfirmation" className="form-label fw-semibold">Confirme sua senha:</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-check-lg"></i>
                                        </span>
                                        <input
                                            id="passwordConfirmation"
                                            className="form-control form-control-lg"
                                            type="password"
                                            name="passwordConfirmation"
                                            placeholder="Digite novamente sua senha"
                                            required
                                        />
                                    </div>
                                    <div className="form-text">Digite a mesma senha novamente para confirmar.</div>
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
                                                Processando...
                                            </>
                                        ) : (
                                            'Confirmar Nova Senha'
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