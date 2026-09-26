# Laboratorio 06 de Desarrollo de Aplicaciones Web Avanzado

Bitácora es una aplicación de publicaciones construida con Express.js, EJS y MongoDB. Los datos se definen con esquemas de Mongoose y se accede a ellos mediante repositorios.

## Alcance

- **Laboratorio base:** conexión a MongoDB, modelos `User` y `Post`, repositorios, servicio, controlador y rutas Express.
- **Tarea:** completar los campos y restricciones de ambos modelos e implementar el CRUD de publicaciones en la web.
- **Actividades opcionales:** la guía no indica ninguna.

## Requisitos

- Node.js 22 o posterior.
- MongoDB en ejecución, local o remoto.
- npm.

## Instalación y ejecución

1. Instala las dependencias con `npm ci`.
2. Copia `.env.example` a `.env` y configura `MONGO_URI` y `PORT` según tu MongoDB. El archivo `.env` está ignorado por Git.
3. Inicia la aplicación con `npm run dev`.
4. Abre `http://localhost:3001/` y entra en **Publicaciones**.

También puedes usar `npm start` para ejecutar el servidor sin recarga automática. La aplicación espera la conexión a MongoDB antes de escuchar solicitudes; si la conexión falla, informa el problema en la terminal.

## Organización

- `app.js`: configuración y arranque de Express.
- `src/db`: conexión a MongoDB.
- `src/models`: esquemas de usuarios y publicaciones.
- `src/repositories`: operaciones de acceso a datos.
- `src/services`: lógica de publicaciones.
- `src/controllers` y `src/routes`: solicitudes web y JSON.
- `src/views` y `src/public`: páginas EJS y estilos de Bitácora.

## Funcionalidad

La portada lleva al listado de publicaciones. Desde la web se puede crear, editar y eliminar cada post. En el formulario se escribe el nombre del autor; si aún no está registrado, el enlace **Registrar autor** permite crear su usuario antes de publicar. La aplicación también expone `POST /api/users` y `GET /api/users`.

Las rutas JSON de publicaciones son `POST /api/posts`, `GET /api/posts`, `PUT /api/posts/:id` y `DELETE /api/posts/:id`. El modelo `User` exige edad mínima de 18 años y contraseña de al menos 8 caracteres; la contraseña se guarda como hash y no se incluye en las respuestas. `Post` exige título de 5 a 30 caracteres, contenido de al menos 10 caracteres y un usuario existente.

El diseño de Bitácora usa una portada gráfica, un listado de entradas numeradas y un formulario propio, diferente de las tarjetas mostradas como ejemplo en la guía.
