import express from 'express';
import * as ticketmasterController from '../controllers/ticketmaster.controller.js';

export const ticketmasterRouter = express.Router();

// Ruta - requiere autenticación (via authMiddleware en index.js)
ticketmasterRouter.get('/ciudad/:ciudad', ticketmasterController.obtenerEventosPorCiudad);
