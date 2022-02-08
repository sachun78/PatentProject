import express from 'express'
import auth from './auth'
import post from './post'
import meeting from './meeting'
import network from './network'
import event from './event'
import user from './user'
import { isAuth } from '../../middleware/authChecker'

const apiRoute = express.Router()
apiRoute.use('/auth', auth)
apiRoute.use('/post', post)
apiRoute.use('/meeting', meeting)
apiRoute.use('/network', network)
apiRoute.use('/event', event)
apiRoute.use('/user', isAuth, user)

export default apiRoute
