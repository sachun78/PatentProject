import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';

import * as meetingRepo from 'data/meeting';
import * as authRepo from 'data/auth';
import { EMAILTYPE, sendmail } from 'middleware/sendMailProc'

interface IRequest {
  [key:string]: any
}

export async function getMeetings(req: IRequest, res: Response) {

}

export async function sendInvitMail(req: IRequest, res: Response) {
  const user_id = req.userId;
  const bodyData = req.body;

  try {
    const meetingData = await createMeeting(user_id, bodyData);
    if (!meetingData) {
      return res.status(500).json({ message: `Failed save meeting ${bodyData.toEmail}`});
    }
    console.log({meetingData});
    const mailInfo = sendmail(meetingData, EMAILTYPE.INVI);
    if (!mailInfo) {
      return res.status(500).json({ message: `Failed email send ${bodyData.toEmail}`});
    }

    res.status(200).json({ message: `Success send email: ${bodyData.toEmail}`})
  }
  catch(e) {
    console.error(e);
    return res.status(500).json({ message: `Exception email send ${bodyData.toEmail}`});
  }
}

async function createMeeting(userId: string, body: any) {
  const user = await authRepo.findById(userId);
  if (!user) {
    return new Promise((resolve, reject) => {
      reject(new Error('message: User is not found'));
    });
  }

  let revMeeting = {
    ownerId: user.id,
    toEmail: body.toEmail,
    eventId: body.eventId, 
    title: body.title,
    date: body.date, 
    time: body.time, 
    location: body.location, 
    comment: body.comment,
    status: 'none',
    code: shortid.generate()
  }

  const meeting = await meetingRepo.createMeeting(revMeeting);
  if (!meeting) {
    return new Promise((resolve, reject) => {
      reject(new Error('message: Failed create meeting'));
    });
  }
  console.log({meeting});
  return meeting;
}
