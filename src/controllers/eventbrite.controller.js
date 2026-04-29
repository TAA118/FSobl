import * as eventbriteService from '../services/eventbrite.service.js';

export const obtenerEventosPorCiudad = async (req, res) => {
    try {
        const { ciudad } = req.params;
        
        if (!ciudad) {
            return res.status(400).json({ 
                ok: false, 
                error: 'La ciudad es requerida' 
            });
        }

        const resultado = await eventbriteService.obtenerEventosPorCiudad(ciudad);
        res.json({ 
            ok: true, 
            ...resultado
        });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
