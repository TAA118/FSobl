import express from 'express';
import * as eventbriteController from '../controllers/eventbrite.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const eventbriteRouter = express.Router();

// Rutas públicas
eventbriteRouter.get('/eventos', eventbriteController.obtenerEventos);
eventbriteRouter.get('/eventos/:id', eventbriteController.obtenerEventoPorId);
eventbriteRouter.get('/ciudad/:ciudad', eventbriteController.obtenerEventosPorCiudad);

// Rutas protegidas (requieren autenticación)
eventbriteRouter.post('/eventos', authMiddleware, eventbriteController.crearEvento);
