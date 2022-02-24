import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import auth from './auth'
import post from './post'
import meeting from './meeting'
import network from './network'
import event from './event'
import profile from './profile'
import authemail from './emailAuth'

const apiRoute = express.Router()
apiRoute.use('/auth', auth)
apiRoute.use('/post', post)
apiRoute.use('/meeting', meeting)
apiRoute.use('/network', network)
apiRoute.use('/event', event)
apiRoute.use('/profile', profile)
apiRoute.use('/authemail', authemail)

apiRoute.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

apiRoute.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

export default apiRoute
