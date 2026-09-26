import mongoose from 'mongoose';

export default async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) throw new Error('Falta MONGO_URI en .env');
  await mongoose.connect(uri);
  console.log('MongoDB conectado');
}
