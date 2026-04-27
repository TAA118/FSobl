import { NotaNoEncontradaError } from "../errors/NotaNoEncontradaError.js"
import { Nota } from "../modelos/nota.model.js"
import { GoogleGenerativeAI } from "@google/generative-ai";

const obtenerNotasUsuario = async idUsuario => {
    //{idUsuario: idUsuario}
    try {
        return await Nota.find({ idUsuario: idUsuario })
    } catch (e) {
        console.log("error al obtener notas de usaurio", e)
        throw new Error("error obteniendo las notas del usuario")
    }
}

const obtenerNotaUsuarioPorId = async (idNota, idUsuario) => {
    //return notas.find(nota => nota.id == id)
    //Nota.findOne({ id: id })
    try {
        const nota = await Nota.findOne({ _id: idNota, idUsuario: idUsuario })
        if (nota) {
            return nota
        }
        throw new NotaNoEncontradaError();
    } catch (e) {
        throw e;
    }
}

const crearNota = async ({ titulo, puntaje, genero, autor, imagen }, idUsuario) => {
    //ir a la base a buscar el usuario
    //si el usuario es plan premium...
    // si es plus? 
    const cantidadDocumentos = await Nota.countDocuments({idUsuario: idUsuario})
    console.log("cantidad de documentos: ", cantidadDocumentos)

    const nuevaNota = {
        titulo,
        puntaje,
        genero,
        autor,
        imagen,
        idUsuario
    }
    const notaGuardada = await Nota.create(nuevaNota)
    return notaGuardada;
}

const modificarNotaUsuarioPorIdNota = async (idNota, body, idUsuario) => {
    const notaModificada = await Nota.findOneAndUpdate(
        { _id: idNota, idUsuario: idUsuario },
        body,
        { returnDocument: "after", runValidators: true }
    )

    if (notaModificada) {
        return notaModificada;
    }

    throw new NotaNoEncontradaError();
}

const eliminarNotaUsuarioPorId = async (idNota, idUsuario) => {
    const nota = await Nota.findOneAndDelete({ _id: idNota, idUsuario: idUsuario })
    if (!nota) {
        throw new NotaNoEncontradaError();
    }
}

const decorarTitulo = async (idNota, idUsuario) => {
    const nota = Nota.findOne({ _id: idNota, idUsuario: idUsuario });

    if (!nota) {
        throw new NotaNoEncontradaError();
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        // Instrucción de sistema para definir el comportamiento "editor"
        systemInstruction: "Eres un editor de títulos para una app de notas minimalista. Tu objetivo es recibir un título aburrido o mal redactado y devolver una versión mejorada, concisa y elegante. No añadas explicaciones, solo devuelve el nuevo título.",
        requestOptions: {
            timeout: 10, // 5 segundos de tiempo máximo de espera
        }
    });

    try {
        const prompt = `Embellece este título: "${nota.titulo}"`;
        const result = await model.generateContent(prompt);
        const tituloDecorado = result.response.text().trim();
        return { tituloOriginal: nota.titulo, tituloDecorado }
    } catch (e) {
        throw e
    }
}

export {
    obtenerNotasUsuario,
    obtenerNotaUsuarioPorId,
    modificarNotaUsuarioPorIdNota,
    eliminarNotaUsuarioPorId,
    crearNota,
    decorarTitulo
}