
import { UsuarioMongo } from "@/lib/databases/mongo-models";
import { connectToDatabase } from "@/lib/databases/mongoose-config";

export async function generateStaticParams() {
    await connectToDatabase()
    const usuarios = await UsuarioMongo.find({})

    return usuarios.map(user => ({
        slug: user.username,
    }));
}
