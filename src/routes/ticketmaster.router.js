import express from 'express';
import * as ticketmasterController from '../controllers/ticketmaster.controller.js';

export const ticketmasterRouter = express.Router();

// Ruta pública para obtener eventos por ciudad
ticketmasterRouter.get('/ciudad/:ciudad', ticketmasterController.obtenerEventosPorCiudad);
