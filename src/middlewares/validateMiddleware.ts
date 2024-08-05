import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => ({
        resource: detail.path[0],
        message: detail.message
      }));
      return res.status(400).json({ type: 'Validation Error', errors });
    }
    next();
  };
};

export default validate;
