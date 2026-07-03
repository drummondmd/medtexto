import { Archive, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import CarouselContainer from "@/components/features/home/carouselContainer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TitleHeader from "@/components/ui/titleHeader";
import { getUserMongo } from "@/lib/databases/handler-mongodb";
import { getUser, getUserProfile } from "@/lib/databases/handler-pgdb";

export default async function UserNamePage({ params }) {
  ///geral
  const { userNameSlug } = await params;

  const user = await getUser(userNameSlug, undefined);
  if (!user) {
    notFound();
  }

  const userProfile = await getUserProfile(user.id);
  const userMongo = await getUserMongo(user.id);
  if (!userProfile || !userMongo) {
    notFound();
  }

  return (
    <div>
      <div>
        <TitleHeader title={"Home"} />
      </div>
      <div>
        <h3>
          Seja bem vindo(a) de volta,{" "}
          {userProfile ? `${userProfile.nome} ${userProfile.sobrenome}` : ""}
        </h3>
        <div className="grid lg:grid-cols-3 space-x-4 mt-4 space-y-4 lg:space-y-0">
          <div className="col-span-2">
            <CarouselContainer />
          </div>
          <div className="grid grid-rows-2 space-y-2 mb-2">
            <Card className="hover:shadow-md transition-shadow border-slate-200">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Bloco de Notas</CardTitle>
                  <CardDescription>Uso temporário e ágil</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Edite textos rapidamente com ferramentas de caixa alta/baixa e cópia simplificada.
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/${userNameSlug}/bloco-de-notas`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Abrir Bloco
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* CARD 2: EVOLUÇÕES */}
            <Card className="hover:shadow-md transition-shadow border-slate-200">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Archive className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Minhas Evoluções</CardTitle>
                  <CardDescription>Templates e modelos padrão</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Salve seus modelos de evolução por categorias e tenha seus textos padronizados
                  sempre à mão.
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/${userNameSlug}/evolucoes`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver Meus Modelos
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
