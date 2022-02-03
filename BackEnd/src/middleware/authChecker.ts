import jwt from 'jsonwebtoken';
import * as authData from 'data/user';
import config from 'config';
import { Request, Response, NextFunction } from 'express'

interface IRequest extends Request {
  [key: string]: any
};

const AUTH_ERROR = { message: 'Authentication Error' };

export async function isAuth(req: IRequest, res: Response, next:NextFunction) {
  let token: any;

  const authHeader = req.get('Authorization');
  if ((authHeader && authHeader.startsWith('Bearer '))) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    token = req.cookies['token'];
  }

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, config.jwt.secure_key, async (error: any, decode : any) => {
      if (error) {
          return res.status(401).json(AUTH_ERROR);
      }
      const user = await authData.findById(decode.id);
      if (!user) {
          return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id;
      req.token = token;
      next();
  });
}
