import { crearCriticaValidatorSchema } from "../validators/crear.critica.validator.js";

const validarCrearCriticaMiddleware = (req, res, next) => {
    const { error } = crearCriticaValidatorSchema.validate(req.body);

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    next();
};

export { validarCrearCriticaMiddleware };
