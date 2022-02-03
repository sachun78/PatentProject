import express from 'express'
import * as MeetingRepo from 'data/meeting'

export function saveMeeting(req: express.Request, res: express.Response) {
  MeetingRepo.saveMeeting(req.body)
    .then(() => {
      return res.status(200).json({ message: 'meeting 저장 성공' })
    })
    .catch(() => {
      return res.status(500).json({ message: 'meeting 저장 실패' })
    })
}

export function findMeetingMySchedule(req: express.Request, res: express.Response) {
  const email = req.body.email
  MeetingRepo.findMeetingMySchedule(email)
    .then((retData) => {
      return res.status(200).json({ message: 'meeting 리스트 찾기 완료', data: retData })
    })
    .catch((error) => {
      return res.status(404).json({ message: error.message })
    })
}
