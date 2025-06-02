'use client'

import { useState } from "react";
import Link from "next/link";
import FormSelect from "./form-select";
import FormCompleto from "../pagina-inicial/form-completo";
import FormButton from "./form-button";
import { changeProtectStatus } from "@/actions/onConfigPage/select-actions";

export default function ConfiguracoesGrid({ userNameSlug, userDetail,isSenhaDefinida }) {
    const isProtect = userDetail.senha_desejada

    const [activeTab, setActiveTab] = useState("preferences")
    const [deletarInput, setDeletar] = useState(true)
    const [toast, setToast] = useState({ isActive: false, mensagem: "", type: "success" })

    ////verificar se usuario digitou e liberar botão para trocar
    function verifyChange(e) {
        const value = e.target.value
        if (value === "Deletar conta") {
            setDeletar(false)
        } else {
            setDeletar(true)
        }
    }
    ///trocar proteçao de conta
    async function onChangeSelect(e) {
        const value = e.target.value
        const user = userDetail
        const response = await changeProtectStatus(user,userNameSlug, value,isSenhaDefinida)
        if (response === true) {
            showToast("Preferencia atualizada com sucesso","success")
        }else{
            showToast("Erro ao atualizar preferencia","error")
        }



    }

    // Função para mostrar o toast
    function showToast(mensagem, type) {
        setToast({
            isActive: true,
            mensagem,
            type
        });

        // Esconder o toast automaticamente após 3 segundos
        setTimeout(() => {
            setToast(prev => ({ ...prev, isActive: false }));
        }, 3000);
    };

    return (
        <div className="container mt-4">
            <h3 className="display-6 mb-4">Preferências do Usuário</h3>
            {/* Toast component inline */}
            {toast.isActive && (
                <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <div
                        className={`toast show ${toast.type === 'success' ? 'bg-success' :
                                toast.type === 'error' ? 'bg-danger' :
                                    toast.type === 'warning' ? 'bg-warning' : 'bg-info'
                            } text-white`}
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                    >
                        <div className="toast-header">
                            <i className={`bi ${toast.type === 'success' ? 'bi-check-circle-fill' :
                                    toast.type === 'error' ? 'bi-exclamation-triangle-fill' :
                                        toast.type === 'warning' ? 'bi-exclamation-circle-fill' : 'bi-info-circle-fill'
                                } me-2`}></i>
                            <strong className="me-auto">Notificação</strong>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setToast(prev => ({ ...prev, isActive: false }))}
                            ></button>
                        </div>
                        <div className="toast-body">
                            {toast.mensagem}
                        </div>
                    </div>
                </div>
            )}

            {/* Sistema de abas horizontais */}
            <ul className="nav nav-tabs nav-fill mb-4" id="preferencesTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === "preferences" ? "active" : ""}`}
                        id="preferences-tab"
                        type="button"
                        onClick={() => setActiveTab("preferences")}
                    >
                        <i className="bi bi-gear me-2"></i>
                        <span>Configurações</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                        id="profile-tab"
                        type="button"
                        onClick={() => setActiveTab("profile")}
                    >
                        <i className="bi bi-person me-2"></i>
                        <span>Perfil</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
                        id="contact-tab"
                        type="button"
                        onClick={() => setActiveTab("contact")}
                    >
                        <i className="bi bi-chat-dots me-2"></i>
                        <span>Contato</span>
                    </button>
                </li>
            </ul>

            <div className="tab-content" id="preferencesTabContent">
                {/* Aba de Perfil */}
                {activeTab === "profile" && (
                    <div className="fade show active" role="tabpanel">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-3">Informações Pessoais</h5>
                                <p className="card-text text-muted mb-4">
                                    Gerencie seus dados pessoais e configurações de conta.
                                </p>
                                <FormCompleto firstUser={false} userDetail={userDetail} username={userNameSlug} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Aba de Configurações */}
                {activeTab === "preferences" && (
                    <div className="fade show active" role="tabpanel">
                        {/* Card de Página Inicial */}
                        {/* Depois adionar a função do toast no componente  */}
                        <div className="card shadow-sm border-0 rounded-3 mb-4">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-3">Página Inicial</h5>
                                <p className="card-text text-muted mb-4">
                                    Escolha qual página será exibida quando você fizer login.
                                </p>

                                <div className="col-md-6">
                                    <FormSelect user={userDetail} />
                                </div>
                            </div>
                        </div>

                        {/* Card de Senha e Segurança */}
                        <div className="card shadow-sm border-0 rounded-3 mb-4">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-3">Senha e Segurança</h5>
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Exigir senha ao entrar</label>
                                            <p className="text-muted small mb-3">
                                                Decida se irá necessitar de senha ao entrar em sua conta
                                            </p>
                                            <select className="form-select" defaultValue={isProtect} onChange={onChangeSelect}>
                                                <option value={true}>Sim</option>
                                                <option value={false}>Não</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Alterar senha</label>
                                            <p className="text-muted small mb-3">
                                                Atualize sua senha para manter sua conta segura
                                            </p>
                                            <FormButton
                                                clickFunction={"resetePass"}
                                                anotherClass={"btn-secondary"}
                                                escrito={"Trocar senha"}
                                                username={userNameSlug}
                                            />
                                        </div>
                                    </div>
{/* verificar email depois */}
                                    {/* <div className="col-lg-6">
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Verificação de e-mail</label>
                                            <p className="text-muted small mb-3">
                                                Status da verificação do seu endereço de e-mail
                                            </p>
                                            {isEmailVerificado ? (
                                                <div className="alert alert-success d-flex align-items-center py-2">
                                                    <i className="bi bi-check-circle-fill me-2"></i>
                                                    <span>O email {userDetail.email} foi verificado</span>
                                                </div>
                                            ) : (
                                                <button className="btn btn-primary">
                                                    <i className="bi bi-envelope me-2"></i>
                                                    Verificar email
                                                </button>
                                            )}
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Card de Apagar Conta */}
                        <div className="card shadow-sm border-0 rounded-3 border-danger border-opacity-25">
                            <div className="card-body p-4">
                                <h5 className="card-title text-danger mb-3">Apagar Conta</h5>
                                <p className="card-text text-muted mb-4">
                                    Se deseja excluir sua conta e apagar todos dados salvos, digite "Deletar conta"
                                </p>
                                <div className="row align-items-end">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <label className="form-label">Confirmação</label>
                                        <input
                                            className="form-control"
                                            placeholder="Deletar conta"
                                            onChange={verifyChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormButton
                                            disabled={deletarInput}
                                            clickFunction={"deleteUser"}
                                            anotherClass={"btn-danger"}
                                            escrito={"Apagar Conta"}
                                            user_id={userDetail.user_id}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Aba de Contato */}
                {activeTab === "contact" && (
                    <div className="fade show active" role="tabpanel">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-3">Entre em Contato</h5>
                                <p className="card-text text-muted mb-4">
                                    Precisa de ajuda? Tem alguma sugestão? Entre em contato conosco.
                                </p>
                                <Link
                                    href={`/${userNameSlug}/contato`}
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-chat me-2"></i>
                                    Ir para página de contato
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
