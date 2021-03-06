import express from 'express'
import * as meetingCtrl from 'controller/meeting'
import { isAuth } from 'middleware/authChecker';

const route = express.Router()

route.get('/', isAuth, meetingCtrl.getMeetings);
route.get('/history', isAuth, meetingCtrl.getMeetingHistory);
route.get('/:id', isAuth, meetingCtrl.getMeeting);
route.get('/show/:code', meetingCtrl.getMeetingByCode);
route.get('/cancel/:code', meetingCtrl.cancelMeeting);
route.get('/confirm/:code', meetingCtrl.confirmMeeting);
route.patch('/replan/:code', meetingCtrl.replanMeeting);
route.patch('/:id', isAuth, meetingCtrl.updateMeeting);
route.post('/send-invitemail', isAuth, meetingCtrl.sendInvitMail);
route.post('/send-resultmail', isAuth, meetingCtrl.sendResultMail);

export default route
