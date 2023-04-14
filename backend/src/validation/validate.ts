import Joi from "joi";

export function validate(schema: Joi.ObjectSchema<any>, formBody: any) {
  const { error } = schema.validate(formBody);
  return error;
}
