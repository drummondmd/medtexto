import mongoose from 'mongoose';

/// Evoluções, receituários, resumos

const EvolucaoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, default: "" }
});

const ReceituarioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, default: "" }
});

const receituarioTransformaSchema = new mongoose.Schema({
  input: String,
  output: String
});

const NotaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String },
});

const ResumoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  notas: [NotaSchema],
});

const UsuarioMongoSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  blocosDeNotas: { type: String, default: "" },
  receituarios: [ReceituarioSchema],
  receituarioTransforma: receituarioTransformaSchema,
  evolucoes: { type: [EvolucaoSchema], default: [] },
  resumos: { type: [ResumoSchema], default: [] }
});

const UsuarioMongo = mongoose.models.UsuarioMongo || mongoose.model('UsuarioMongo', UsuarioMongoSchema);

/// Calculadoras

const SubEntradaSchema = new mongoose.Schema({
  tipo: String,
  nome: String,
  value: mongoose.Schema.Types.Mixed,
  isDefault: String
});

const EntradaSchema = new mongoose.Schema({
  nome: String,
  displayNome: String,
  inputType: String,
  tipo: String,
  unidade: String,
  placeholder: String,
  obs: String,
  entradas: [SubEntradaSchema]
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

export {Calculadora,UsuarioMongo}
