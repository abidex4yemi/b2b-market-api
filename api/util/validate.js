/**
 * Validate request body
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @param {object} schema
 */
const joiValidate = (req, res, next, schema) => {
  // validate request body against predefined schema
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  // check for validation error
  if (error) {
    // Format error object of JOI
    const errors = error.details.map((current) => {
      return {
        field: current.context.key,
        message: current.message.replace(/['"]/g, ''),
      };
    });

    return res.status(400).json({
      errors,
    });
  }

  req.body = value;

  return next();
};

export default joiValidate;
