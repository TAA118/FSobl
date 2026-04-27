import { crearGeneroValidatorSchema } from "../validators/crear.genero.validator.js";

const validarCrearGeneroMiddleware = (req, res, next) => {
    const { error } = crearGeneroValidatorSchema.validate(req.body);

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    next();
};

export { validarCrearGeneroMiddleware };
