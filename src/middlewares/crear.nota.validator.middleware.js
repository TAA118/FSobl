import { crearNotaValidatorSchema } from "../validators/crear.nota.validator.js";

const validarCrearNotaMiddleware = (req, res, next) => {
    const { error } = crearNotaValidatorSchema.validate(req.body)

    if (error) {
        //hay al menos un error de validacion
        res.status(400).json({ message: error.message })
        return
    }

    next()
}

export { validarCrearNotaMiddleware }