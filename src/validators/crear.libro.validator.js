import Joi from "joi";

const crearLibroValidatorSchema = Joi.object({
    titulo: Joi.string().min(1).max(1000).required(),
    genero: Joi.string().min(1).max(100).required(),
    autor: Joi.string().min(1).max(100).required(),
    fecha: Joi.date().iso().required(),
    imagen: Joi.string().optional(),
    sinopsis: Joi.string().optional()
});

export { crearLibroValidatorSchema };
