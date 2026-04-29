import express from 'express';
import * as eventbriteController from '../controllers/eventbrite.controller.js';

export const eventbriteRouter = express.Router();

// Ruta pública para obtener eventos por ciudad
eventbriteRouter.get('/ciudad/:ciudad', eventbriteController.obtenerEventosPorCiudad);
