import express from "express";
import { obtenerGeneros, crearGenero } from "../controllers/generos.controller.v1.js";
import { validarCrearGeneroMiddleware } from "../middlewares/crear.genero.validator.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const generosRouterV1 = express.Router();

generosRouterV1.get("/generos", obtenerGeneros);
generosRouterV1.post("/generos", adminMiddleware, validarCrearGeneroMiddleware, crearGenero);

export { generosRouterV1 };
