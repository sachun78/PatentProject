import express from 'express'
import * as mMhisCtrl from 'controller/mhistory'
import { isAuth } from 'middleware/authChecker';

const route = express.Router()

route.post('/:id', isAuth, mMhisCtrl.createMhistory);
route.post('/upload/:id', isAuth, mMhisCtrl.profileImage);

export default route