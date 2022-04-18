import express from 'express'
import * as meetingCtrl from 'controller/meeting'
import { isAuth } from 'middleware/authChecker';

const route = express.Router()

route.get('/', isAuth, meetingCtrl.getMeetings);
route.get('/:id', isAuth, meetingCtrl.getMeeting);
route.get('/show/:code', meetingCtrl.getMeetingByCode);
route.get('/cancel/:code', meetingCtrl.cancelMeeting);
route.get('/confirm/:code', meetingCtrl.confirmMeeting);
route.patch('/replan/:code', meetingCtrl.replanlMeeting);
route.post('/send-invitemail', isAuth, meetingCtrl.sendInvitMail);
route.post('/', isAuth, meetingCtrl.sendResultMail);

export default route
