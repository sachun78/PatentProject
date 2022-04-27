import express from 'express'
import * as mMhisCtrl from 'controller/mhistory'
import { isAuth } from 'middleware/authChecker';

const route = express.Router()

route.post('/upload/', isAuth, mMhisCtrl.mhistoryImage);
route.post('/:id', isAuth, mMhisCtrl.createMhistory);

export default route