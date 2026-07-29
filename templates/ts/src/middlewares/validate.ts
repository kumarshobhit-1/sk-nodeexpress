import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject } from 'zod';
import { ApiResponse } from '../utils/apiResponse.js';

export const validate = (schema: AnyZodObject): RequestHandler => (req: Request, res: Response, next: NextFunction): void => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error: any) {
    if (error.errors) {
      const formattedErrors = error.errors.map((err: any) => ({
        field: err.path.join('.').replace('body.', ''),
        message: err.message,
      }));
      ApiResponse.error(res, 'Validation Error', 400, formattedErrors);
      return;
    }
    next(error);
  }
};
