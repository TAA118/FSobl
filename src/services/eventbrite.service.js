import { TICKETMASTER_CONFIG } from '../config/eventbrite_config.js';

export const obtenerEventosPorCiudad = async (ciudad, page = 1, limit = 5) => {
    try {
        const skip = (page - 1) * limit;

        const params = new URLSearchParams({
            'keyword': ciudad,
            'city': ciudad,
            'apikey': TICKETMASTER_CONFIG.API_KEY,
            'sort': 'date,asc',
            'size': limit * 2,
            'page': Math.floor(skip / (limit * 2))
        });

        const response = await fetch(
            `${TICKETMASTER_CONFIG.BASE_URL}/events.json?${params.toString()}`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const allEventos = data._embedded?.events?.map(event => ({
            id: event.id,
            nombre: event.name,
            descripcion: event.description || 'Sin descripción',
            fecha_inicio: event.dates?.start?.dateTime,
            url: event.url,
            imagen: event.images?.[0]?.url,
            ciudad: ciudad,
            venue: event._embedded?.venues?.[0]?.name
        })) || [];

        const eventos = allEventos.slice(skip, skip + limit);
        const total = data.page?.totalElements || allEventos.length;
        const hoy = new Date();

        return {
            ciudad,
            mes: hoy.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            cantidad: eventos.length,
            eventos
        };

    } catch (error) {
        throw new Error(`Error buscando eventos en ${ciudad}: ${error.message}`);
    }
};

