import EditarCalculadoraPage from "@/components/admin/editar-calculadora";
import { getCalculadora, getCalculadoras } from "@/lib/databases/handler-mongodb";

export default async function EditarCalc({ params }) {
  const { slug } = await params;
  const calculadora = await getCalculadora(slug);
  const todasCalculadoras = await getCalculadoras();

  return (
    <EditarCalculadoraPage
      calculadora={JSON.stringify(calculadora)}
      todasCalculadoras={JSON.stringify(todasCalculadoras)}
    />
  );
}
