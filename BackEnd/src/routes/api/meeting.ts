import express from 'express'
import * as meetingCtrl from 'controller/meeting'
import { isAuth } from 'middleware/authChecker';

const route = express.Router()

route.post('/send-invitemail', isAuth, meetingCtrl.sendInvitMail);

export default route
