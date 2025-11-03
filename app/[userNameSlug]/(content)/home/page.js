import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function UserNamePage({ params }) {
  ///geral
  const { userNameSlug } = await params;

  const user = await getUser(userNameSlug);
  if (!user) {
    notFound();
  }

  const userProfile = await getUserProfile(user.id);
  const userMongo = await getUserMongo(user.id);
  if (!userProfile || !userMongo) {
    notFound();
  }

  return (
    <>
      <div className="col-lg-10">
        <div className="container my-5">
          <div>
            <h3>
              Seja bem vindo(a) de volta,{" "}
              {userProfile ? `${userProfile.nome} ${userProfile.sobrenome}` : ""}
            </h3>
            {/* Posteriormente colocando detalhes do usuario */}
            {/* {userDetail.tipo_usuario && <span>{`${userDetail.tipo_usuario} - `} </span>}
                        {userDetail.especialidade ?? <span>{userDetail.especialidade}</span>} */}
          </div>
        </div>
        {/* Posteriormente carrosel com informações e publicidade */}
        {/* <div className="container m-5">
                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <svg className="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: First slide" preserveAspectRatio="xMidYMid slice"><title>Placeholder</title><rect width="100%" height="100%" fill="#666"></rect><text x="50%" y="50%" fill="#444" dy=".3em">First slide</text></svg>
                            </div>
                            <div className="carousel-item">
                                <svg className="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Second slide" preserveAspectRatio="xMidYMid slice"><title>Placeholder</title><rect width="100%" height="100%" fill="#666"></rect><text x="50%" y="50%" fill="#444" dy=".3em">Second slide</text></svg>
                            </div>
                            <div className="carousel-item">
                                <svg className="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Third slide" preserveAspectRatio="xMidYMid slice"><title>Placeholder</title><rect width="100%" height="100%" fill="#666"></rect><text x="50%" y="50%" fill="#444" dy=".3em">Third slide</text></svg>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div> */}
      </div>
    </>
  );
}
