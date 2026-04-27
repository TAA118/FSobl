import * as librosService from "../services/libros.service.v1.js";

const obtenerLibros = async (req, res) => {
    try {
        const libros = await librosService.obtenerLibros();
        res.status(200).json(libros);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const obtenerLibroPorId = async (req, res) => {
    const idLibro = req.params.id;

    try {
        const libro = await librosService.obtenerLibroPorId(idLibro);
        res.status(200).json(libro);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
};

const crearLibro = async (req, res) => {
    try {
        const nuevoLibro = await librosService.crearLibro(req.body);
        res.status(201).json(nuevoLibro);
    } catch (e) {
        res.status(500).json({ message: e.message || "error al crear el libro" });
    }
};

const modificarLibro = async (req, res) => {
    const idLibro = req.params.id;
    const body = req.body;

    try {
        const libroModificado = await librosService.modificarLibroPorId(idLibro, body);
        res.status(200).json(libroModificado);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
};

const eliminarLibro = async (req, res) => {
    const idLibro = req.params.id;

    try {
        await librosService.eliminarLibroPorId(idLibro);
        res.status(204).send();
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
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
        return res.status(e.code || 500).json({ message: e.message || "Error al subir la imagen" });
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
