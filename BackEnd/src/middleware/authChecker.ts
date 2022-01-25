import * as jwt from 'jsonwebtoken';
import { secretKey } from "../middleware/authSign";
import { Request, Response, NextFunction } from 'express';

export const authChecker = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization || req.query.token;
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        res.status(401).json({ error: 'Auth Error from authChecker' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Auth Error from authChecker' });
  }
};