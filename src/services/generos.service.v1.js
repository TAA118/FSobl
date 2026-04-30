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
    // Validar que no exista un género con el mismo nombre
    const generoExistente = await Genero.findOne({ nombre: nombre });
    if (generoExistente) {
        throw new Error("El género ya existe");
    }
    
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

const modificarGeneroPorId = async (idGenero, { nombre }) => {
    try {
        const generoModificado = await Genero.findByIdAndUpdate(
            idGenero,
            { nombre },
            { returnDocument: "after", runValidators: true }
        );
        if (!generoModificado) {
            throw new Error("Género no encontrado");
        }
        return generoModificado;
    } catch (e) {
        console.log("error al modificar género", e);
        if (e.code === 11000) {
            throw new Error("El género ya existe");
        }
        throw new Error(e.message);
    }
};

const eliminarGeneroPorId = async (idGenero) => {
    try {
        const generoEliminado = await Genero.findByIdAndDelete(idGenero);
        if (!generoEliminado) {
            throw new Error("Género no encontrado");
        }
        return generoEliminado;
    } catch (e) {
        console.log("error al eliminar género", e);
        throw new Error(e.message);
    }
};

export { obtenerGeneros, crearGenero, modificarGeneroPorId, eliminarGeneroPorId };
