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

// Índice único: un usuario solo puede hacer una crítica por libro
criticaSchema.index({ idUsuario: 1, idLibro: 1 }, { unique: true });

const Critica = mongoose.model("Critica", criticaSchema);

export { Critica };
