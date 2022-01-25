import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { userInfo } from 'os';

export type headers = {
    alg:{ type: String, default: "HS256"},
    typ:{ type: String, default: "JWT"}
  }

export type userInfo = {
    name: String,
    email: String
}

export const secretKey = 'WEmetHaShInGOFsECrEtKEY';

export function makeJWTkey(req: Request, res: Response) {
    const user:userInfo = {
        name: req.body.name,
        email: req.body.email
    }

    jwt.sign(user, secretKey, 
        function(err,token){
          if(err) {
              console.log(err);
              res.sendStatus(401)
              res.send(null)
          } else {
             //console.log(token);
             res.send(token)
          }
        }
    )
}