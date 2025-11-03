import pg from "pg";

///pg
const { Pool } = pg;

///remote database
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

/*

/////mongoose
const usernameMongo = process.env.MONGO_ATLAS_USER
const passwordMongo = process.env.MONGO_ATLAS_PASSWORD

const connetionString = `mongodb+srv://${usernameMongo}:${passwordMongo}@medtexto.dfchk9y.mongodb.net/?retryWrites=true&w=majority&appName=MedTexto&authSource=admin`

main().catch(err => console.error(err));


async function main() {
  ///local
  // await mongoose.connect("mongodb://localhost:27017/medtexto");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  /// atlas
  await mongoose.connect(connetionString)

}

///usuarios Mongo
const EvolucaoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, default: "" }
})

const ReceituarioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, default: "" }
});

const receituarioTransformaSchema = new mongoose.Schema({
  input: String,
  output: String
})

const NotaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String },
});

const ResumoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  notas: [NotaSchema],
});

const UsuarioMongoSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true }, // ID referenciado do PostgreSQL
  userName: { type: String, required: true, unique: true },
  blocosDeNotas: { type: String, default: "" },
  receituarios: [ReceituarioSchema],
  receituarioTransforma: receituarioTransformaSchema,
  evolucoes: { type: [EvolucaoSchema], default: [] },
  resumos: { type: [ResumoSchema], default: [] }
});


const UsuarioMongo = mongoose.models.UsuarioMongo || mongoose.model("UsuarioMongo", UsuarioMongoSchema);


//// Calculadora schema

const SubEntradaSchema = new mongoose.Schema({
  tipo: String, // ex: "radio"
  nome: String,
  value: mongoose.Schema.Types.Mixed, // Pode ser string, number, etc.,
  isDefault: String
});

const EntradaSchema = new mongoose.Schema({
  nome: String,
  displayNome: String,
  inputType: String, // "input" ou "select"
  tipo: String,
  unidade: String,
  placeholder: String,
  obs: String,
  entradas: [SubEntradaSchema] // usado em selects com múltiplas opções
});

const ReferenciaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  link: String
});

const CalculadoraSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  instrucoes: String,
  entradas: [EntradaSchema],
  calculadorasRelacionadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calculadora', default: [] }],
  evidencia: String,
  referencias: [ReferenciaSchema],
  slug: { type: String, unique: true },
  functionLogic: { type: String, required: true, unique: true }
});

const Calculadora = mongoose.models.Calculadora || mongoose.model('Calculadora', CalculadoraSchema);
// const Calculadora =  mongoose.model('Calculadora', CalculadoraSchema);

*/

export { pool };
