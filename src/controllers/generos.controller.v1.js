import * as generosService from "../services/generos.service.v1.js";
import { generoDTO } from "../dtos/genero.dto.js";

const obtenerGeneros = async (req, res) => {
    try {
        const generos = await generosService.obtenerGeneros();
        res.status(200).json(generos.map(generoDTO));
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const crearGenero = async (req, res) => {
    try {
        const generoCreado = await generosService.crearGenero(req.body);
        res.status(201).json(generoDTO(generoCreado));
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

const modificarGenero = async (req, res) => {
    try {
        const idGenero = req.params.id;
        const generoModificado = await generosService.modificarGeneroPorId(idGenero, req.body);
        res.status(200).json(generoDTO(generoModificado));
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
