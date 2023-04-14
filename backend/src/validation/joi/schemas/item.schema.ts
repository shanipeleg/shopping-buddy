import Joi from "joi";

export const ItemSchema = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().alphanum().min(3).max(50).required(),
  categoryId: Joi.number(),
});
