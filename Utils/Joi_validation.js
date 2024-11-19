import Joi from "joi";

const userValidationSchema = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Valid email is required",
    }),

    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
      .required()
      .messages({
        // "string.empty": "Password is required",
        // "string.min": "Password must be at least 8 characters long",
        "string.pattern.base":
          "Password must be at least 8 characters with uppercase, numbers, and special characters.",
      }),
  });

  // Validate the data against the schema
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    const errorMessage = {};
    error.details.forEach((detail) => {
      errorMessage[detail.context.key] = detail.message.replace(/['"]+/g, "");
    });
    return errorMessage;
  }

  return null;
};

export { userValidationSchema };
