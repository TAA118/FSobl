import express from "express";
import { crearCritica, eliminarCritica, modificarCritica, obtenerCriticaPorId, obtenerCriticasUsuario, obtenerCriticasLibro } from "../controllers/criticas.controller.v1.js";
import { validarCrearCriticaMiddleware } from "../middlewares/crear.critica.validator.middleware.js";

const criticasRouterV1 = express.Router();

criticasRouterV1.get("/criticas", obtenerCriticasUsuario);
criticasRouterV1.get("/libros/:idLibro/criticas", obtenerCriticasLibro);
criticasRouterV1.get("/criticas/:id", obtenerCriticaPorId);
criticasRouterV1.post("/criticas", validarCrearCriticaMiddleware, crearCritica);
criticasRouterV1.put("/criticas/:id", modificarCritica);
criticasRouterV1.delete("/criticas/:id", eliminarCritica);

export { criticasRouterV1 };
