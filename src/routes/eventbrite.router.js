import express from 'express';
import * as eventbriteController from '../controllers/eventbrite.controller.js';

export const eventbriteRouter = express.Router();

// Rutas públicas
eventbriteRouter.get('/eventos', eventbriteController.obtenerEventos);
eventbriteRouter.get('/eventos/:id', eventbriteController.obtenerEventoPorId);
eventbriteRouter.get('/ciudad/:ciudad', eventbriteController.obtenerEventosPorCiudad);
