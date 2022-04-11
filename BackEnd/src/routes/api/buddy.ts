import express from 'express'
import * as buddyCtrl from 'controller/buddy'
import { isAuth } from '../../middleware/authChecker'

const route = express.Router()

route.get('/', isAuth, buddyCtrl.getBuddy);
route.post('/', isAuth, buddyCtrl.addBuddy);

export default route