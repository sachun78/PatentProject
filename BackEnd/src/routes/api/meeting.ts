import express from 'express'
import * as meetingCtrl from 'controller/meeting'

const route = express.Router()

route.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('meeting')
  }
)

route.post('/meetingup', meetingCtrl.saveMeeting)
route.post('/meetingfind', meetingCtrl.findMeetingMySchedule)

export default route
