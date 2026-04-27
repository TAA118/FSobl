import mongoose from "mongoose";

const criticaSchema = new mongoose.Schema({
    puntaje: { type: Number, required: true, min: 1, max: 10 },
    comentario: { type: String, required: true },
    idLibro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Libro",
        required: true
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
}, {
    timestamps: true,
    collection: "criticas"
});

const Critica = mongoose.model("Critica", criticaSchema);

export { Critica };
