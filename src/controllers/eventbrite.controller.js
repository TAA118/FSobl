import * as eventbriteService from '../services/eventbrite.service.js';

export const obtenerEventosPorCiudad = async (req, res) => {
    try {
        const { ciudad } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        
        if (!ciudad) {
            return res.status(400).json({ 
                ok: false, 
                error: 'La ciudad es requerida' 
            });
        }

        const resultado = await eventbriteService.obtenerEventosPorCiudad(ciudad, page, limit);
        res.json({ 
            ok: true, 
        res.status(500).json({ ok: false, error: error.message });
    }
};
