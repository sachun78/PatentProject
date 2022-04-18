import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';

import * as meetingRepo from 'data/meeting';
import * as authRepo from 'data/auth';
import * as eventRepo from 'data/event';
import { EMAILTYPE, sendmail } from 'middleware/sendMailProc'

interface IRequest {
  [key:string]: any
}

const enum MEETING_STATUS {
  NONE = 'none',
  CONFIRM = 'confirm',
  CANCEL = 'cancel',
  REPLAN = 'replan'
}

const checkInviteCode = async (code: string, data: any): Promise<any> => {
  const meeting = await meetingRepo.getByCode(code);
  if (!meeting) {
    return new Promise((resolve, reject) => {
      reject(new Error('message: Not found meeting'));
    });
  }

  const meetingUpdate = await meetingRepo.updateMeeting(meeting.id, data);
  if (!meetingUpdate) {
    return new Promise((resolve, reject) => {
      reject(new Error('message: Failed meeting info update'));
    });
  }

  return meetingUpdate;
}

export async function getMeetings(req: IRequest, res: Response) {
  const user_id = req.userId;
  const bodyData: Object = req.body;

  let data;
  if (bodyData.constructor === Object && Object.keys(bodyData).length === 0) {
    data = await meetingRepo.getAll(user_id);
  }
  else {
    data = await meetingRepo.getAll(user_id, bodyData);
  }

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

export async function getMeetingByCode(req: IRequest, res: Response) {
  const code = req.params.code;

  const data = await meetingRepo.getByCode(code);
  if (!data) {
    return res.status(404).json({ message: `meeting code:(${code}) not found`});
  }

  res.status(200).json(data);
}

export async function confirmMeeting(req: IRequest, res: Response) {
  const code = req.params.code;

  try {
    const data = {status: MEETING_STATUS.CONFIRM};
    const check = await checkInviteCode(code, data);
    res.status(200).json({ message: `Success update status[${check.status}]`});
  }
  catch(e) {
    console.error(e);
    return res.status(403).json({ message: 'Failed meeting info update'});
  }
}

export async function cancelMeeting(req: IRequest, res: Response) {
  const code = req.params.code;

  try {
    const data = {status: MEETING_STATUS.CANCEL};
    const check = await checkInviteCode(code, data);
    res.status(200).json({ message: `Success update status[${check.status}]`});
  }
  catch(e) {
    console.error(e);
    return res.status(403).json({ message: 'Failed meeting info update'});
  }
}

export async function replanlMeeting(req: IRequest, res: Response) {
  const code = req.params.code;

  try {
    const data = {status: MEETING_STATUS.REPLAN, ...req.body};
    const check = await checkInviteCode(code, data);
    res.status(200).json({ message: `Success update status[${check.status}]`});
  }
  catch(e) {
    console.error(e);
    return res.status(403).json({ message: 'Failed meeting info update'});
  }
}

export async function sendResultMail(req: IRequest, res: Response) {
  const mId = req.body.meetingId;
  const mStatus = req.body.status;
  const origin: string = req.get('origin');

  try {
    const meeting = await meetingRepo.getById(mId);
    if (meeting) {
      meeting["status"] = mStatus;
      console.log(meeting);
      const mailInfo = sendmail(origin, meeting, EMAILTYPE.RESULT);
      if (!mailInfo) {
        return res.status(500).json({ message: `Failed email send ${meeting.toEmail}`});
      }
      await meetingRepo.updateMeeting(meeting.id, meeting);
      return res.status(200).json({ message: `Success send email: ${meeting.toEmail}`});
    }
    else {
      return res.status(409).json({ message: `[Meeting(${mId}) not found] or [status(${mStatus}) is wrong]`});
    }
  }
  catch(e) {
    console.error(e);
    return res.status(409).json({ message: `Meeting(${mId})  not found`});
  }
}

export async function sendInvitMail(req: IRequest, res: Response) {
  const user_id = req.userId;
  const bodyData = req.body;
  const origin: string = req.get('origin');

  try {
    const meetingData = await createMeeting(user_id, bodyData);
    if (!meetingData) {
      return res.status(500).json({ message: `Failed save meeting ${bodyData.toEmail}`});
    }

    const mailInfo = sendmail(origin, meetingData, EMAILTYPE.INVI);
    if (!mailInfo) {
      return res.status(500).json({ message: `Failed email send ${bodyData.toEmail}`});
    }

    res.status(200).json({ message: `Success send email: ${bodyData.toEmail}`});
  }
  catch(e) {
    console.error(e);
    return res.status(500).json({ message: `${e} => ${bodyData.toEmail}`});
  }
}

async function createMeeting(userId: string, body: any) {
  const user = await authRepo.findById(userId);
  if (!user) {
    throw new Error('message: User is not found');
  }

  let revMeeting = {
    ownerId: user.id,
    ownerEmail: user.email,
    ownerName: user.username,
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
    throw new Error('Failed create meeting');
  }

  const event = await eventRepo.getById(meeting.eventId);
  if (!event) {
    throw new Error('Not found event');
  }
  let meetingList: string[] = [meeting.id, ...event.meeting_list];
  const eventUpdate = await eventRepo.updateEvent(meeting.eventId, {meeting_list: meetingList});
  if (!eventUpdate) {
    throw new Error('Failed meeting list update');
  }

  const retMeetingData = {
    ...revMeeting,
    ownerPhoto: user.photo_path
  };
  return retMeetingData;
}
