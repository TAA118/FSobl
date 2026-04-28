import * as generosService from "../services/generos.service.v1.js";

const obtenerGeneros = async (req, res) => {
    try {
        const generos = await generosService.obtenerGeneros();
        res.status(200).json(generos);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const crearGenero = async (req, res) => {
    try {
        const generoCreado = await generosService.crearGenero(req.body);
        res.status(201).json(generoCreado);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

const modificarGenero = async (req, res) => {
    try {
        const idGenero = req.params.id;
        const generoModificado = await generosService.modificarGeneroPorId(idGenero, req.body);
        res.status(200).json(generoModificado);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

const eliminarGenero = async (req, res) => {
    try {
        const idGenero = req.params.id;
        await generosService.eliminarGeneroPorId(idGenero);
        res.status(204).send();
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export { obtenerGeneros, crearGenero, modificarGenero, eliminarGenero };
