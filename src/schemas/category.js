import Joi from "joi";
 export const categoryschema = Joi.object({
    name: Joi.string().required(),
 });
 