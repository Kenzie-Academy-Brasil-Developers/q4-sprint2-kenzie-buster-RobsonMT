import * as yup from "yup";

const registerDvdSchema = yup.object().shape({
  dvds: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          name: yup
            .string()
            .transform((value) => {
              return value
                .split(" ")
                .map(
                  (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
                )
                .join(" ");
            })
            .required(),
          duration: yup.string().lowercase().required(),
          quantity: yup.number().required(),
          price: yup
            .number()
            .transform((value) => {
              return Number.parseFloat(value.toFixed(2));
            })
            .required(),
        })
        .required()
    )
    .required(),
});

export { registerDvdSchema };
