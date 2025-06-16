import mongoose from 'mongoose';

const usernameMongo = process.env.MONGO_ATLAS_USER;
const passwordMongo = process.env.MONGO_ATLAS_PASSWORD;

const connectionString = `mongodb+srv://${usernameMongo}:${passwordMongo}@medtexto.dfchk9y.mongodb.net/?retryWrites=true&w=majority&appName=MedTexto&authSource=admin`;

if (!usernameMongo || !passwordMongo) {
  throw new Error('Credenciais do MongoDB não estão definidas');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(connectionString, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export {connectToDatabase}

