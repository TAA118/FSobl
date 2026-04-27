import { Critica } from "../modelos/critica.model.js";
import { NotaNoEncontradaError } from "../errors/NotaNoEncontradaError.js";
import { Usuario } from "../modelos/user.model.js";

const obtenerCriticasUsuario = async (idUsuario) => {
    try {
        return await Critica.find({ idUsuario: idUsuario }).populate("idLibro");
    } catch (e) {
        console.log("error al obtener críticas del usuario", e);
        throw new Error("error obteniendo las críticas del usuario");
    }
};

const obtenerCriticasLibro = async (idLibro) => {
    const total = await Critica.countDocuments({ idLibro: idLibro });
    const page = Number(page);
    const limit = Number(limit);
    const skip = (page - 1) * limit;
    try {
        const criticas = await Critica.find({ idLibro: idLibro }).populate("idUsuario", "nombreUsuario nombre apellido")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        return { total, criticas, page, limit, totalPages: Math.ceil(total / limit) };
    } catch (e) {
        console.log("error al obtener críticas del libro", e);
        throw new Error("error obteniendo las críticas del libro");
    }
};

const obtenerCriticaPorId = async (idCritica, idUsuario) => {
    const critica = await Critica.findOne({ _id: idCritica, idUsuario: idUsuario }).populate("idLibro");
    if (critica) {
        return critica;
    }
    throw new NotaNoEncontradaError();
};

const crearCritica = async ({ puntaje, comentario, idLibro }, idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    if (usuario.plan === "plus") {
        const cantidadCriticas = await Critica.countDocuments({ idUsuario: idUsuario });
        if (cantidadCriticas >= 4) {
            throw new Error("No puedes crear más de 4 críticas con el plan plus. Actualiza a premium para crear más.");
        }
    }

    const nuevaCritica = {
        puntaje,
        comentario,
        idLibro,
        idUsuario
    };
    const criticaGuardada = await Critica.create(nuevaCritica);
    return await criticaGuardada.populate("idLibro");
};

const modificarCriticaPorId = async (idCritica, body, idUsuario) => {
    const criticaModificada = await Critica.findOneAndUpdate(
        { _id: idCritica, idUsuario: idUsuario },
        body,
        { returnDocument: "after", runValidators: true }
    ).populate("idLibro");

    if (criticaModificada) {
        return criticaModificada;
    }

    throw new NotaNoEncontradaError();
};

const eliminarCriticaPorId = async (idCritica, idUsuario) => {
    const critica = await Critica.findOneAndDelete({ _id: idCritica, idUsuario: idUsuario });
    if (!critica) {
        throw new NotaNoEncontradaError();
    }
};

export {
    obtenerCriticasUsuario,
    obtenerCriticasLibro,
    obtenerCriticaPorId,
    crearCritica,
    modificarCriticaPorId,
    eliminarCriticaPorId
};
