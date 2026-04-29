import { EVENTBRITE_CONFIG } from '../config/eventbrite_config.js';

const headers = {
    'Authorization': `Bearer ${EVENTBRITE_CONFIG.API_KEY}`,
    'Content-Type': 'application/json'
};

export const obtenerEventos = async () => {
    try {
        const params = new URLSearchParams({
            'q': '*',
            'sort_by': 'date',
            'start_date.keyword': 'this_month'
        });

        const response = await fetch(
            `${EVENTBRITE_CONFIG.BASE_URL}/events/search/?${params.toString()}`,
            { headers }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        return data.events?.map(event => ({
            id: event.id,
            nombre: event.name?.text,
            descripcion: event.description?.text?.substring(0, 200),
            fecha_inicio: event.start?.utc,
            fecha_fin: event.end?.utc,
            url: event.url,
            imagen: event.logo?.url,
            ciudad: event.venue?.address?.city || 'N/A'
        })) || [];
    } catch (error) {
        throw new Error(`Error obteniendo eventos: ${error.message}`);
    }
};

export const obtenerEventoPorId = async (eventId) => {
    try {
        const response = await fetch(
            `${EVENTBRITE_CONFIG.BASE_URL}/events/${eventId}/`,
            { headers }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        throw new Error(`Error obteniendo evento: ${error.message}`);
    }
};



export const obtenerEventosPorCiudad = async (ciudad) => {
    try {
        // Obtener fechas del mes actual
        const hoy = new Date();
        const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const fin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

        // Convertir a formato ISO con timezone
        const fechaInicio = inicio.toISOString();
        const fechaFin = fin.toISOString();

        // Construir query de búsqueda - Endpoint público
        const params = new URLSearchParams({
            'q': ciudad,
            'sort_by': 'date',
            'start_date.keyword': 'this_month',
            'location.address': ciudad,
            'price': 'free,paid'
        });

        const response = await fetch(
            `https://www.eventbriteapi.com/v3/events/search/?${params.toString()}`,
            { 
                headers: {
                    'Authorization': `Bearer ${EVENTBRITE_CONFIG.API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        // Filtrar y mapear eventos relevantes
        const eventos = data.events?.map(event => ({
            id: event.id,
            nombre: event.name?.text,
            descripcion: event.description?.text?.substring(0, 200),
            fecha_inicio: event.start?.utc,
            fecha_fin: event.end?.utc,
            url: event.url,
            imagen: event.logo?.url,
            estatus: event.status,
            ciudad: event.venue?.address?.city || ciudad
        })) || [];
        
        return eventos;
    } catch (error) {
        throw new Error(`Error buscando eventos en ${ciudad}: ${error.message}`);
    }
};

