import * as eventbriteService from '../services/eventbrite.service.js';

export const obtenerEventos = async (req, res) => {
    try {
        const eventos = await eventbriteService.obtenerEventos();
        res.json({ ok: true, eventos });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const obtenerEventoPorId = async (req, res) => {
    try {
        const evento = await eventbriteService.obtenerEventoPorId(req.params.id);
        res.json({ ok: true, evento });
    } catch (error) {
        res.status(404).json({ ok: false, error: error.message });
    }
};



export const obtenerEventosPorCiudad = async (req, res) => {
    try {
        const { ciudad } = req.params;
        
        if (!ciudad) {
            return res.status(400).json({ 
                ok: false, 
                error: 'La ciudad es requerida' 
            });
        }

        const eventos = await eventbriteService.obtenerEventosPorCiudad(ciudad);
        res.json({ 
            ok: true, 
            ciudad,
            mes: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
            cantidad: eventos.length,
            eventos 
        });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
