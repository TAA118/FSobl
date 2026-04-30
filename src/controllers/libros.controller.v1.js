import * as librosService from "../services/libros.service.v1.js";
import { libroDTO } from "../dtos/libro.dto.js";

const obtenerLibros = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const resultado = await librosService.obtenerLibros(page, limit);
        resultado.libros = resultado.libros.map(libroDTO);
        res.status(200).json(resultado);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const obtenerLibroPorId = async (req, res) => {
    const idLibro = req.params.id;

    try {
        const libro = await librosService.obtenerLibroPorId(idLibro);
        res.status(200).json(libroDTO(libro));
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
};

const crearLibro = async (req, res) => {
    try {
        const nuevoLibro = await librosService.crearLibro(req.body);
        res.status(201).json(libroDTO(nuevoLibro));
    } catch (e) {
        if (e.code === 11000) {
            res.status(409).json({ message: "El título ya existe" });
        } else if (e.message.includes("Ya existe")) {
            res.status(409).json({ message: e.message });
        } else {
            res.status(400).json({ message: e.message });
        }
    }
};

const modificarLibro = async (req, res) => {
    const idLibro = req.params.id;
    const body = req.body;
    const img = req.file;

    try {
        let libroModificado = await librosService.modificarLibroPorId(idLibro, body);
        
        // Si se proporciona una imagen, subirla
        if (img) {
            if (!img.mimetype.startsWith("image/")) {
                return res.status(400).json({ message: "El archivo proporcionado no es una imagen" });
            }
            await librosService.subirImagen(idLibro, img);
            // Obtener el libro actualizado con la imagen
            libroModificado = await librosService.obtenerLibroPorId(idLibro);
        }
        
        res.status(200).json(libroDTO(libroModificado));
    } catch (e) {
        if (e.code === 11000) {
            res.status(409).json({ message: "El título ya está registrado" });
        } else if (e.message.includes("no encontrado")) {
            res.status(404).json({ message: e.message });
        } else {
            res.status(400).json({ message: e.message });
        }
    }
};

const eliminarLibro = async (req, res) => {
    const idLibro = req.params.id;

    try {
        await librosService.eliminarLibroPorId(idLibro);
        res.status(204).send();
    } catch (e) {
        if (e.message.includes("no encontrado")) {
            res.status(404).json({ message: e.message });
        } else {
            res.status(400).json({ message: e.message });
        }
    }
};

const subirImagen = async (req, res) => {
    const idLibro = req.params.id;
    const img = req.file;

    if (!img) {
        return res.status(400).json({ message: "No se ha proporcionado una imagen" });
    }

    if (!img.mimetype.startsWith("image/")) {
        return res.status(400).json({ message: "El archivo proporcionado no es una imagen" });
    }

    try {
        const result = await librosService.subirImagen(idLibro, img);
        return res.status(200).json({ message: "Imagen subida correctamente", url: result });
    } catch (e) {
        if (e.message.includes("not found")) {
            return res.status(404).json({ message: "El libro no existe" });
        }
        return res.status(500).json({ message: "Error al subir la imagen. Intenta nuevamente" });
    }
};

export {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    modificarLibro,
    eliminarLibro,
    subirImagen
};
