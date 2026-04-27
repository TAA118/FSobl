import mongoose from "mongoose";

const notaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    puntaje: { type: Number, required: true, min: 1, max: 10 },
    genero: { type: String, required: true },
    autor: { type: String, required: true },
    imagen: { type: String },
    idUsuario: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
}, 
{
    timestamps: true, 
    collection: "notas"
})

const Nota = mongoose.model("Nota", notaSchema)

export { Nota } 