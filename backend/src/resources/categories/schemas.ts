import Joi from "joi";

export const CategorySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  icon: Joi.string().max(20).required(),
}).options({ stripUnknown: true });
