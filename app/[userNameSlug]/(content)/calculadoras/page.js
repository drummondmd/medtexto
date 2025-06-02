import CalculadorasGrid from "@/components/calculadoras/calculadoras-grid";
import { getCalculadoras } from "@/lib/databases/handler-mongodb";


export default async function Calculadoras({ params }) {
    const calculadoras = await getCalculadoras();

    return (
        <div className="container">
            <CalculadorasGrid data={JSON.stringify(calculadoras)} />
        </div>

    )
}