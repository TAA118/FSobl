import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: {  required: true , type: String },
    contrasena: { type: String, required: true },
    mail: { type: String, required: true },
    rol: { type: String, required: true },
    plan: { type: String, enum: ["plus", "premium"], default: "plus" }
}, {
    timestamps: true,
    collection: "usuarios"
})

const Usuario = mongoose.model("Usuario", userSchema)

export { Usuario }
