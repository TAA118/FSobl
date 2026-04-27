import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    autor: { type: String, required: true },
    fecha: { type: Date, required: true },
    imagenURL: { type: String },
    sinopsis: { type: String }
}, {
    timestamps: true,
    collection: "libros"
});

const Libro = mongoose.model("Libro", libroSchema);

export { Libro };
