import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';

export const validate = (schema: z.ZodObject<any, any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.issues.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ');
      return next(new ApiError(400, errorMessage));
    }
    next(error);
  }
};
