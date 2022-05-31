import * as yup from "yup";
import * as bcrypt from "bcrypt";

const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .transform((value) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    })
    .required(),
  email: yup.string().email().lowercase().required(),
  password: yup
    .string()
    .transform((value) => {
      return bcrypt.hashSync(value, 10);
    })
    .required(),
  isAdm: yup.boolean().optional(),
});

const serializedCreateUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
});

export { createUserSchema, serializedCreateUserSchema };
