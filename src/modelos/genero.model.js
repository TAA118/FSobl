import mongoose from "mongoose";

const generoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true }
}, {
    timestamps: true,
    collection: "generos"
});

const Genero = mongoose.model("Genero", generoSchema);

export { Genero };
