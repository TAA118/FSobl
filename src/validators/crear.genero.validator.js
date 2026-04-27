import Joi from "joi";

const crearGeneroValidatorSchema = Joi.object({
    nombre: Joi.string().min(3).max(100).required()
});

export { crearGeneroValidatorSchema };
