import express from "express"
import { crearNota, decorarTitulo, elminarNota, modificarNota, obtenerNotaPorId, obtenerNotas } from "../controllers/notas.controller.v1.js";
import { validarCrearNotaMiddleware } from "../middlewares/crear.nota.validator.middleware.js";

const notasRouterV1 = express.Router();

notasRouterV1.get("/notas", obtenerNotas)
notasRouterV1.get("/notas/:id", obtenerNotaPorId)
notasRouterV1.post("/notas", validarCrearNotaMiddleware, crearNota)
notasRouterV1.put("/notas/:id", modificarNota)
notasRouterV1.delete("/notas/:id", elminarNota)
notasRouterV1.get("/notas/:id/decorar-titulo", decorarTitulo)

export { notasRouterV1 }