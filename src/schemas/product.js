import Joi, { number, string } from "joi";
export const Productschems = Joi.object({
    name:string().required(),
    price:number().required(),
    categoryId:string().required(),

});
