import { crearLibroValidatorSchema } from "../validators/crear.libro.validator.js";

const validarCrearLibroMiddleware = (req, res, next) => {
    const { error } = crearLibroValidatorSchema.validate(req.body);

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    next();
};

export { validarCrearLibroMiddleware };
