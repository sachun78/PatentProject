import * as jwt from 'jsonwebtoken';
import { secretKey } from "../middleware/authSign";
import { Request, Response, NextFunction } from 'express';
import { getCookie } from './cookie'

export const authChecker = (req: Request, res: Response, next: NextFunction) => {
    const token = getCookie('WeMettoken');
    if (token) {
    jwt.verify(token, secretKey, (err:any) => {
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