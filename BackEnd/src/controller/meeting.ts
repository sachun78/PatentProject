import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';

import * as meetingRepo from 'data/meeting';
import * as authRepo from 'data/auth';
import * as eventRepo from 'data/event';
import { EMAILTYPE, sendmail } from 'middleware/sendMailProc'

interface IRequest {
  [key:string]: any
}

const checkInviteCode = (code: string) => {

}

export async function getMeetings(req: IRequest, res: Response) {
  const user_id = req.userId;

  const data = await meetingRepo.getAll(user_id);
  res.status(200).json(data);
}

export async function getMeeting(req: IRequest, res: Response) {
  const user_id = req.userId;
  const id = req.params.id;

  const data = await meetingRepo.getById(id);
  if (data) {
    if (data.ownerId !== user_id) {
      return res.status(403).send('forbidden');
    }
    res.status(200).json(data);
  }
  else {
    res.status(404).json({ message: `meeting id(${id}) not found`});
  }
}

export async function confirmMeeting(req: IRequest, res: Response) {
  const code = req.params.code;

  const meeting = await meetingRepo.findByCode(code);
  if (!meeting) {
    return res.status(404).json({message: `Invalid code: ${code}`});
  }

  const meetingUpdate = await meetingRepo.updateMeeting(meeting.id, {status: 'confirm'});
  if (!meetingUpdate) {
    return res.status(401).json({ message: 'Failed meeting info update'});
  }

  res.status(200).json({ message: 'Success update meeting info'});
}

export async function cancelMeeting(req: IRequest, res: Response) {
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
  };

  const meeting = await meetingRepo.createMeeting(revMeeting);
  if (!meeting) {
    return new Promise((resolve, reject) => {
      reject(new Error('message: Failed create meeting'));
    });
  }

  const event = await eventRepo.getById(meeting.eventId);
  if (!event) {
    return new Promise((resolve, reject) => {
      reject(new Error('message: Not found event'));
    });
  }
  let meetingList: string[] = [meeting.id, ...event.meeting_list];
  const eventUpdate = await eventRepo.updateEvent(meeting.eventId, {meeting_list: meetingList});
  if (!eventUpdate) {
    return new Promise((resolve, reject) => {
      reject(new Error('message: Failed meeting list update'));
    });
  }
  
  const retMeetingData = {
    ...revMeeting,
    ownerEmail: user.email,
    ownerName: user.username,
    ownerPhoto: user.photo_path
  };
  return retMeetingData;
}
