import express from 'express'
import * as userCtrl from 'controller/user'

const route = express.Router()

route.post('/upload', userCtrl.profileImage)

export default route
