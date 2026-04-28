import express from 'express'
import 'dotenv/config'
import { pingRouter } from './src/routes/ping.router.js';
import { librosRouterV1 } from './src/routes/libros.router.v1.js';
import { criticasRouterV1 } from './src/routes/criticas.router.v1.js';
import { generosRouterV1 } from './src/routes/generos.router.v1.js';
import { logMiddleware } from './src/middlewares/logger.middleware.js';
import { authMiddleware } from './src/middlewares/auth.middleware.js';
import { authRouter } from './src/routes/auth.router.v1.js';
import { conectarBD } from './src/config/db_config.js';
import { eventbriteRouter } from './src/routes/eventbrite.router.js';

const app = express();

app.use(express.json());

app.use(logMiddleware)

//Rutas publicas
app.use("/", pingRouter)
app.use("/v1", authRouter)
app.use("/v1", eventbriteRouter)

//Rutas privadas
app.use(authMiddleware)
app.use("/v1", librosRouterV1)
app.use("/v1", criticasRouterV1)
app.use("/v1", generosRouterV1)

//conectate con la base de datos
conectarBD();

//Inicializamos el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})