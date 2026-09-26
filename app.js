import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import connectDB from './src/db/database.js';
import homeRoutes from './src/routes/home.routes.js';
import postRoutes from './src/routes/post.routes.js';
import apiRoutes from './src/routes/api.routes.js';

const root = path.dirname(fileURLToPath(import.meta.url));
export const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(root, 'src', 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(root, 'src', 'public')));
app.use('/', homeRoutes);
app.use('/posts', postRoutes);
app.use('/api', apiRoutes);

app.use((error, req, res, next) => {
  let status = error.status || 500;
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) status = 400;
  if (error.code === 11000) status = 409;
  const message = status === 500 ? 'Error interno del servidor' : error.message;
  if (status === 500) console.error(error);
  res.status(status).json({ error: message });
});

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  connectDB()
    .then(() => app.listen(process.env.PORT || 3001, () => {
      console.log(`Servidor en http://localhost:${process.env.PORT || 3001}`);
    }))
    .catch(error => {
      console.error(`No se pudo conectar a MongoDB: ${error.message}`);
      process.exitCode = 1;
    });
}
