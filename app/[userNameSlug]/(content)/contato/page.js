import contactForm from "@/actions/contactPage/form-action";
import { getUser } from "@/lib/databases/handler-pgdb";

export default async function Contato({params}) {


    const { userNameSlug } = await params
    const userDetail =await getUser(userNameSlug);

    const formAction = ""


    return (
        <div className="container my-3">
            <form className="row g-3" action={contactForm}>
                {/* hidden */}
                <input type="text" name="user" value={userNameSlug} readOnly hidden/>
                <input type="text" name="email" value={userDetail.email} readOnly hidden/>


                {/* Motivo do Contato */}
                <div className="col-md-12">
                    <label className="form-label">Motivo do Contato</label>
                    <select name="motivo" className="form-control" required>
                        <option value="">Selecione...</option>
                        <option value="erro">Erro</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="reclamacao">Reclamação</option>
                        <option value="dica">Dica</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                {/* Mensagem */}
                <div className="col-md-12">
                    <label className="form-label">Mensagem</label>
                    <textarea
                        name="mensagem"
                        className="form-control"
                        rows={6}
                        placeholder="Descreva seu contato aqui..."
                        required
                    />
                </div>
                <div className="col-md-12">
                    <p>Deseja receber retorno por email?</p>
                    <div className="row g-3">
                    <div className="form-group col-md-1">
                        <label className="form-label">Sim  </label>
                        <input name="emailResponse" type="radio" value="sim" defaultChecked />


                    </div>

                    <div className="form-group col-md-1">

                        <label className="form-label">Não  </label>
                        <input name="emailResponse" type="radio" value="nao" />
                    </div>

                    </div>




                </div>


                {/* Botão */}
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
            </form>

        </div>


    )
}