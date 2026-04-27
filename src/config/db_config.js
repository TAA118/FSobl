import mongoose from "mongoose";

const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
        console.log("BD Conectada a Atlas");
    } catch (e) {
        console.log("Error al conectar con mongo db :(", e);
        process.exit(1);
    }
}

export { conectarBD }