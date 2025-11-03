import { getCalculadoras } from "@/lib/databases/handler-mongodb";
import { connectToDatabase } from "@/lib/databases/mongoose-config";

export async function generateStaticParams() {
  await connectToDatabase();
  const calculadoras = await getCalculadoras();
  return calculadoras.map((calc) => ({
    slug: calc.slug,
  }));
}
