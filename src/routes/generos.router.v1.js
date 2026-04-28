import express from "express";
import { obtenerGeneros, crearGenero, modificarGenero, eliminarGenero } from "../controllers/generos.controller.v1.js";
import { validarCrearGeneroMiddleware } from "../middlewares/crear.genero.validator.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const generosRouterV1 = express.Router();

generosRouterV1.get("/generos", obtenerGeneros);
generosRouterV1.post("/generos", adminMiddleware, validarCrearGeneroMiddleware, crearGenero);
generosRouterV1.put("/generos/:id", adminMiddleware, validarCrearGeneroMiddleware, modificarGenero);
generosRouterV1.delete("/generos/:id", adminMiddleware, eliminarGenero);

export { generosRouterV1 };
