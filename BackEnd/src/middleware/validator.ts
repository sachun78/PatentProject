import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

interface IRequest extends Request {
  [key: string]: any
}

export const validate = (req: IRequest, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};