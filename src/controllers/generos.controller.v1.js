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

export { obtenerGeneros, crearGenero };
