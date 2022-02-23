import express from 'express'
import * as meetingCtrl from 'controller/meeting'
import { isAuth } from 'middleware/authChecker';

const route = express.Router()

route.get('/', isAuth, meetingCtrl.getMeetings);
route.get('/:id', isAuth, meetingCtrl.getMeeting);
route.get('/cancel/:code', meetingCtrl.cancelMeeting);
route.get('/confirm/:code', meetingCtrl.confirmMeeting);
route.post('/send-invitemail', isAuth, meetingCtrl.sendInvitMail);

export default route
