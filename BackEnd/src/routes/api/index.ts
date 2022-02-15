import express from 'express'
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

export default apiRoute
