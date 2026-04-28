import express from "express";
import { obtenerLibros, obtenerLibroPorId, crearLibro, modificarLibro, eliminarLibro, subirImagen } from "../controllers/libros.controller.v1.js";
import multer from 'multer';

const librosRouterV1 = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

librosRouterV1.get("/libros", obtenerLibros);
librosRouterV1.get("/libros/:id", obtenerLibroPorId);
librosRouterV1.post("/libros", crearLibro);
librosRouterV1.put("/libros/:id", modificarLibro);
librosRouterV1.delete("/libros/:id", eliminarLibro);
librosRouterV1.post("/libros/:id/imagen", upload.single('imagen'), subirImagen);

export { librosRouterV1 };
