import * as criticasService from "../services/criticas.service.v1.js";

const obtenerCriticasUsuario = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const resultado = await criticasService.obtenerCriticasUsuario(req.idUsu, page, limit);
        res.status(200).json(resultado);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const obtenerCriticasLibro = async (req, res) => {
    try {
        const idLibro = req.params.idLibro;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const resultado = await criticasService.obtenerCriticasLibro(idLibro, page, limit);
        res.status(200).json(resultado);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const obtenerCriticaPorId = async (req, res) => {
    const idUsuario = req.idUsu;
    const idCritica = req.params.id;

    try {
        const critica = await criticasService.obtenerCriticaPorId(idCritica, idUsuario);
        res.status(200).json(critica);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
};

const crearCritica = async (req, res) => {
    try {
        const nuevaCritica = await criticasService.crearCritica(req.body, req.idUsu);
        res.status(201).json(nuevaCritica);
    } catch (e) {
        res.status(500).json({ message: e.message || "error al crear la crítica" });
    }
};

const modificarCritica = async (req, res) => {
    const idCritica = req.params.id;
    const body = req.body;

    try {
        const criticaModificada = await criticasService.modificarCriticaPorId(idCritica, body, req.idUsu);
        res.status(200).json(criticaModificada);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
};

const eliminarCritica = async (req, res) => {
    const idCritica = req.params.id;

    try {
        await criticasService.eliminarCriticaPorId(idCritica, req.idUsu);
        res.status(204).send();
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
};

export {
    obtenerCriticasUsuario,
    obtenerCriticasLibro,
    obtenerCriticaPorId,
    crearCritica,
    modificarCritica,
    eliminarCritica
};
