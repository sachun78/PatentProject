import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { userInfo } from 'os';
import { getCookie, setCookie } from './cookie'

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
              //res.send(null)
          } else {
              if(token){
             //console.log(token);
             setCookie('WeMettoken', token, {
                path: '/',
                httpOnly: true,
                secure: true,
                //expires: Math.floor(Date.now() / 1000) + (60 * 60)
             })
             console.log('---------------------------------------------')
             console.log(getCookie('WeMettoken'))
             res.sendStatus(200)
             //res.send(token)
            }
          }
        }
    )

    
}