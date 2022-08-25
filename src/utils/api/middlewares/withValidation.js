/**
 * @name withValidation
 * @description Validates request body with Zod parser
 * @param handler
 * @param schema
 */
const withValidation = (handler, schema) => {
  return (req, res) => {
    const response = schema.safeParse(req.body);

    if (!response.success) {
      return res.status(422).json({
        error: "Bad or missing params.",
      });
    }

    req.data = response.data;

    return handler(req, res);
  };
};

export default withValidation;
