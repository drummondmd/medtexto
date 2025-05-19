
import pg from 'pg'
import mongoose from 'mongoose';


///pg
const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medtexto',
  password: '123369',
  port: 5433,
});


/////mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/medtexto");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
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

// const AnexoSchema = new mongoose.Schema({
//   tipo: { type: String, enum: ["imagem", "pdf", "outro"], required: true },
//   url: { type: String, required: true },
// });

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
  value: mongoose.Schema.Types.Mixed // Pode ser string, number, etc.
});

const EntradaSchema = new  mongoose.Schema({
  nome: String,
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
  calculadorasRelacionadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calculadora',default: [] }],
  evidencia: String,
  referencias: [ReferenciaSchema],
  slug: { type: String, unique: true },
  functionLogic: { type: String, required: true, unique:true }
});

const Calculadora = mongoose.models.Calculadora || mongoose.model('Calculadora', CalculadoraSchema);
// const Calculadora =  mongoose.model('Calculadora', CalculadoraSchema);

export { pool, UsuarioMongo,Calculadora };
