import { EVENTBRITE_CONFIG } from '../config/eventbrite_config.js';

const headers = {
    'Authorization': `Bearer ${EVENTBRITE_CONFIG.API_KEY}`,
    'Content-Type': 'application/json'
};

export const obtenerEventosPorCiudad = async (ciudad) => {
    try {
        const hoy = new Date();

        const params = new URLSearchParams({
            'q': ciudad,
            'sort_by': 'date'
        });

        const response = await fetch(
            `${EVENTBRITE_CONFIG.BASE_URL}/events/search/?${params.toString()}`,
            { headers }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const eventos = data.events?.map(event => ({
            id: event.id,
            nombre: event.name?.text,
            descripcion: event.description?.text?.substring(0, 200),
            fecha_inicio: event.start?.utc,
            fecha_fin: event.end?.utc,
            url: event.url,
            imagen: event.logo?.url,
            ciudad: event.venue?.address?.city || ciudad
        })) || [];

        return {
            ciudad,
            mes: hoy.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
            cantidad: eventos.length,
            eventos
        };

    } catch (error) {
        throw new Error(`Error buscando eventos en ${ciudad}: ${error.message}`);
    }
};

