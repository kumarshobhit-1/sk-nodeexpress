import { ApiResponse } from '../utils/apiResponse.js';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error.errors) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.').replace('body.', ''),
        message: err.message,
      }));
      return ApiResponse.error(res, 'Validation Error', 400, formattedErrors);
    }
    next(error);
  }
};
