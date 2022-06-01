import * as yup from "yup";

const buyDvdSchema = yup.object().shape({
  quantity: yup.number().required(),
});

export { buyDvdSchema };
