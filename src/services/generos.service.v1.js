import { Genero } from "../modelos/genero.model.js";
import { GeneroNoEncontradoError } from "../errors/GeneroNoEncontradoError.js";
import { GeneroDuplicadoError } from "../errors/GeneroDuplicadoError.js";
import { ValidationError } from "../errors/ValidationError.js";

const obtenerGeneros = async () => {
    try {
        return await Genero.find();
    } catch (e) {
        console.log("error al obtener géneros", e);
        throw new ValidationError("Error al obtener los géneros");
    }
};

const crearGenero = async ({ nombre }) => {
    // Validar que no exista un género con el mismo nombre
    const generoExistente = await Genero.findOne({ nombre: nombre });
    if (generoExistente) {
        throw new GeneroDuplicadoError(nombre);
    }
    
    try {
        const nuevoGenero = { nombre };
        const generoGuardado = await Genero.create(nuevoGenero);
        return generoGuardado;
    } catch (e) {
        console.log("error al crear género", e);
        if (e.code === 11000) {
            throw new GeneroDuplicadoError(nombre);
        }
        throw new ValidationError("Error al crear el género");
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
            throw new GeneroNoEncontradoError();
        }
        return generoModificado;
    } catch (e) {
        console.log("error al modificar género", e);
        if (e.code === 11000) {
            throw new GeneroDuplicadoError(nombre);
        }
        throw e;
    }
};

const eliminarGeneroPorId = async (idGenero) => {
    try {
        const generoEliminado = await Genero.findByIdAndDelete(idGenero);
        if (!generoEliminado) {
            throw new GeneroNoEncontradoError();
        }
        return generoEliminado;
    } catch (e) {
        console.log("error al eliminar género", e);
        throw e;
    }
};

export { obtenerGeneros, crearGenero, modificarGeneroPorId, eliminarGeneroPorId };
