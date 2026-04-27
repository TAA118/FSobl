import Joi from "joi";

const crearCriticaValidatorSchema = Joi.object({
    puntaje: Joi.number().strict().integer().min(1).max(10).required(),
    comentario: Joi.string().min(1).max(5000).required(),
    idLibro: Joi.string().required()
});

export { crearCriticaValidatorSchema };
