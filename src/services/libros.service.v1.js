import { Libro } from "../modelos/libro.model.js";
import { NotaNoEncontradaError } from "../errors/NotaNoEncontradaError.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from "cloudinary";

const obtenerLibros = async () => {
    try {
        return await Libro.find();
    } catch (e) {
        console.log("error al obtener libros", e);
        throw e;
    }
};

const generarSinopsisPorGemini = async (titulo, autor, genero) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction: "Eres un escritor experto en reseñas. Tu objetivo es generar una sinopsis breve y atractiva para un libro basado en su título, autor y género. La sinopsis debe tener entre 100-200 palabras, ser cautivadora y no incluir explicaciones adicionales."
    });

    try {
        const prompt = `Genera una sinopsis para este libro:\nTítulo: ${titulo}\nAutor: ${autor}\nGénero: ${genero}`;
        const result = await model.generateContent(prompt);
        const sinopsis = result.response.text().trim();
        return sinopsis;
    } catch (e) {
        console.log("error al generar sinopsis con Gemini", e);
        throw new Error("error generando la sinopsis con Gemini");
    }
};

const obtenerLibroPorId = async (idLibro) => {
    const libro = await Libro.findOne({ _id: idLibro });
    if (libro) {
        return libro;
    }
    throw new NotaNoEncontradaError();
};

const crearLibro = async ({ titulo, genero, autor, fecha, imagenURL, sinopsis }) => {
    let sinopsisLibro = sinopsis;
    
    if (!sinopsisLibro) {
        try {
            sinopsisLibro = await generarSinopsisPorGemini(titulo, autor, genero);
        } catch (e) {
            console.log("Servicio de IA indisponible, dejando sinopsis vacía", e);
            sinopsisLibro = "";
        }
    }
    
    const nuevoLibro = {
        titulo,
        genero,
        autor,
        fecha,
        imagenURL,
        sinopsis: sinopsisLibro
    };
    const libroGuardado = await Libro.create(nuevoLibro);
    return libroGuardado;
};

const modificarLibroPorId = async (idLibro, body) => {
    const libroModificado = await Libro.findOneAndUpdate(
        { _id: idLibro },
        body,
        { returnDocument: "after", runValidators: true }
    );

    if (libroModificado) {
        return libroModificado;
    }

    throw new NotaNoEncontradaError();
};

const eliminarLibroPorId = async (idLibro) => {
    const libro = await Libro.findOneAndDelete({ _id: idLibro });
    if (!libro) {
        throw new NotaNoEncontradaError();
    }
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const subirImagen = async (idLibro, img) => {
    const libro = await Libro.findOne({ _id: idLibro });
    if (!libro) {
        throw new NotaNoEncontradaError();
    }

    const imgBase64 = Buffer.from(img.buffer).toString('base64');
    const uri = "data:" + img.mimetype + ";base64," + imgBase64;

    try {
        const result = await cloudinary.uploader.upload(uri)
        libro.imagenURL = result.secure_url;
        return await libro.save();

        } catch (e) {
        console.log("error al subir imagen a Cloudinary", e);
        throw new Error("error al subir imagen");
    }

};



export {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    modificarLibroPorId,
    eliminarLibroPorId,
    generarSinopsisPorGemini
};
