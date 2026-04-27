import Joi from "joi";

const crearNotaValidatorSchema = Joi.object({
    titulo: Joi.string().min(5).max(1000).required().messages({
        "string.max": "El titulo debe tener maximo 1000 caracteres"
    }),
    puntaje: Joi.number().strict().integer().min(1).max(10).required(),
    genero: Joi.string().min(3).max(100).required(),
    autor: Joi.string().min(3).max(100).required(),
    imagen: Joi.string().optional()
})

export { crearNotaValidatorSchema }