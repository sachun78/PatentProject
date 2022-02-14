import express from 'express'
import * as profileCtrl from 'controller/profile'
import { isAuth } from '../../middleware/authChecker'

const route = express.Router();

route.get('/', isAuth, profileCtrl.getProfile);
route.patch('/update-profile', isAuth, profileCtrl.updateProfile);
route.post('/upload', isAuth, profileCtrl.profileImage)

export default route;