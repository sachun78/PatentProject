import express from 'express'
import * as buddyCtrl from 'controller/buddy'
import { isAuth } from '../../middleware/authChecker'

const route = express.Router()

route.get('/getBuddy', isAuth, buddyCtrl.getBuddy);
route.post('/addBuddy', isAuth, buddyCtrl.addBuddy);

export default route
