# Notas API 📚

API REST para gestionar notas de libros, críticas, géneros y más. Integrada con Eventbrite API y MongoDB.

## Características

- ✅ Autenticación JWT
- ✅ CRUD completo de notas, libros, críticas y géneros
- ✅ Integración con Eventbrite API (búsqueda de eventos)
- ✅ Subida de imágenes con Cloudinary
- ✅ MongoDB Atlas en la nube
- ✅ Generación de resúmenes con Google Gemini API

## Requisitos previos

- Node.js v18+
- npm o yarn
- MongoDB Atlas (cuenta gratuita)
- Cuentas en Cloudinary y Eventbrite (opcional)

## Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd notas-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Crear archivo `.env`**
```bash
cp .env.example .env
```

4. **Configurar variables de entorno**
Edita `.env` con tus credenciales:
- `MONGO_DB_CONNECTION_STRING` - Connection string de MongoDB Atlas
- `CLOUDINARY_*` - Credenciales de Cloudinary
- `EVENTBRITE_API_KEY` - Token de Eventbrite
- `GEMINI_API_KEY` - API Key de Google Gemini
- `JWT_SECRET_KEY` - Clave secreta para JWT

5. **Iniciar el servidor**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints principales

### Autenticación
- `POST /v1/auth/register` - Registrar usuario
- `POST /v1/auth/login` - Iniciar sesión

### Notas
- `GET /v1/notas` - Obtener todas las notas
- `GET /v1/notas/:id` - Obtener nota por ID
- `POST /v1/notas` - Crear nota
- `PUT /v1/notas/:id` - Actualizar nota
- `DELETE /v1/notas/:id` - Eliminar nota

### Libros
- `GET /v1/libros` - Obtener todos los libros
- `POST /v1/libros` - Crear libro
- `POST /v1/libros/:id/imagen` - Subir imagen del libro

### Eventos (Eventbrite)
- `GET /v1/ciudad/:ciudad` - Buscar eventos por ciudad (mes actual)

## Estructura del proyecto

```
notas-api/
├── src/
│   ├── config/          # Configuración (DB)
│   ├── controllers/      # Controladores
│   ├── middlewares/      # Middlewares
│   ├── modelos/          # Esquemas MongoDB
│   ├── routes/           # Rutas
│   ├── services/         # Lógica de negocio
│   ├── validators/       # Validadores
│   └── dtos/             # Data Transfer Objects
├── index.js             # Entrada principal
├── package.json         # Dependencias
└── .env                 # Variables de entorno
```

## Scripts disponibles

```bash
npm run dev     # Inicia el servidor con nodemon
npm test        # Ejecutar tests
npm start       # Iniciar servidor en producción
```

## Tecnologías

- **Backend:** Express.js, Node.js
- **Base de datos:** MongoDB Atlas
- **Autenticación:** JWT
- **Validación:** Joi
- **Almacenamiento de imágenes:** Cloudinary
- **APIs externas:** 
  - Eventbrite API
  - Google Generative AI

## Configuración de MongoDB Atlas

Si quieres usar MongoDB Atlas en lugar de local:

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster
3. Copia la connection string
4. Actualiza `MONGO_DB_CONNECTION_STRING` en `.env`

## Notas

- El archivo `.env` contiene credenciales sensibles y **NO debe ser commiteado**
- Usa variables de entorno para configurar según tu entorno (desarrollo, producción)
- Las contraseñas deben ser seguras en producción

## Licencia

MIT
