import express from 'express';
import * as ticketmasterController from '../controllers/ticketmaster.controller.js';

export const ticketmasterRouter = express.Router();

ticketmasterRouter.get('/ciudad/:ciudad', ticketmasterController.obtenerEventosPorCiudad);
