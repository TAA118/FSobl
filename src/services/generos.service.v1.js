import { Genero } from "../modelos/genero.model.js";

const obtenerGeneros = async () => {
    try {
        return await Genero.find();
    } catch (e) {
        console.log("error al obtener géneros", e);
        throw new Error("Error al obtener los géneros");
    }
};

const crearGenero = async ({ nombre }) => {
    try {
        const nuevoGenero = { nombre };
        const generoGuardado = await Genero.create(nuevoGenero);
        return generoGuardado;
    } catch (e) {
        console.log("error al crear género", e);
        if (e.code === 11000) {
            throw new Error("El género ya existe");
        }
        throw new Error("Error al crear el género");
    }
};

export { obtenerGeneros, crearGenero };
