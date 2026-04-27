import * as notasService from "../services/notas.service.v1.js";


const obtenerNotas = async (req, res) => {
    try {
        const notas = await notasService.obtenerNotasUsuario(req.idUsu)
        res.status(200).json(notas)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const obtenerNotaPorId = async (req, res) => {
    const idUsuario = req.idUsu;
    const idNota = req.params.id
    try {
        const nota = await notasService.obtenerNotaUsuarioPorId(idNota, idUsuario);
        res.status(200).json(nota);
    } catch (e) {
        console.log(e)
        res.status(e.code || 500).json({ message: e.message })
    }
}

const crearNota = async (req, res) => {
    try {
        const nuevaNota = await notasService.crearNota(req.body, req.idUsu) //me devuelve la NOTA CREADA
        res.status(201).json(nuevaNota);
    } catch (e) {
        res.status(500).json({ message: "error al crear la nota" });
    }
}

const modificarNota = async (req, res) => {
    const idNota = req.params.id

    const body = req.body

    try {
        const notaModificada = await notasService.modificarNotaUsuarioPorIdNota(idNota, body, req.idUsu)
        res.status(200).json(notaModificada);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const elminarNota = async (req, res) => {
    const idNota = req.params.id
    try {
        await notasService.eliminarNotaUsuarioPorId(idNota, req.idUsu)
        res.status(204).send();
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const decorarTitulo = async (req, res) => {
    const idNota = req.params.id

    try {
        const tituloMejorado = await notasService.decorarTitulo(idNota, req.idUsu)
        res.status(200).json(tituloMejorado);
    } catch(e) {
        res.status(e.code || 500).json({ message: e.message });
    }
}

export {
    obtenerNotas,
    obtenerNotaPorId,
    crearNota,
    modificarNota,
    elminarNota,
    decorarTitulo
}