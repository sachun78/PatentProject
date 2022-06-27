import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';
import Fuse from 'fuse.js';
import { isWithinInterval } from 'date-fns'

import * as meetingRepo from 'data/meeting';
import * as authRepo from 'data/auth';
import * as eventRepo from 'data/event';
import * as profileRepo from 'data/profile';
import { EMAILTYPE, sendmail } from 'middleware/sendMailProc';

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
    throw new Error('message: Not found meeting');
  }

  const isPossibleAddSchedule = await isPossibleAdd(meeting.eventId, {start: meeting.startTime, end: meeting.endTime});
  if (isPossibleAddSchedule === false) {
    throw new Error('message: already meeting schedule');
  }

  const meetingUpdate = await meetingRepo.updateMeeting(meeting.id, data);
  if (!meetingUpdate) {
    throw new Error('message: Failed meeting info update');
  }

  return meetingUpdate;
}

export async function getMeetings(req: IRequest, res: Response, next: NextFunction) {
  const user_id = req.userId;
  const searchData = req.query.search;
  const curPos = req.query.curPos as string;
  const cnt = req.query.cnt as string;

  try {
    if (curPos && cnt) {
      let _curPos: number = parseInt(curPos);
      let _cnt: number = parseInt(cnt);
  
      const indexData = await meetingRepo.getAllByIndex(user_id, _curPos, _cnt);
      return res.status(200).json(indexData);
    }

    const user = await authRepo.findById(user_id);
    if (!user) {
      return res.status(409).json({ message: `meeting: userId (${user_id}) not found`});
    }

    const data = await meetingRepo.getAllWithToEmail(user_id, user.email);
    //const data = await meetingRepo.getAll(user_id);
    let retData;
    
    const fuse = new Fuse(data, {
      includeScore: true,
      useExtendedSearch: true,
      keys: ['ownerCompnay', 'toEmail', 'title', 'ownerName']
    });
    if (searchData) {
      retData = fuse.search("'" + searchData);
      retData = retData.map(value => value.item);
      return res.status(200).json(retData);
    }
    else {
      return res.status(200).json(data);
    }
  }
  catch(e) {
    console.error(`[meetingCtrl][getMeetings] Fail meeting get all`);
    next(e);
  }
}

export async function getMeetingHistory(req: IRequest, res: Response) {
  const user_id = req.userId;
  const toEmail = req.query.toEmail;

  const data = await meetingRepo.getAllHistory(user_id, toEmail);
  res.status(200).json(data);
}

export async function getMeeting(req: IRequest, res: Response) {
  const user_id = req.userId;
  const id = req.params.id;

  let sendData: any = {};
  const data = await meetingRepo.getById(id);
  if (data) {
    if (data.ownerId !== user_id) {
      return res.status(403).send('[getMeeting] forbidden');
    }
    sendData = JSON.parse(JSON.stringify(data));

    const user = await authRepo.findByEmail(data.toEmail);
    if (!user) {
      sendData.isPaidUser = false;
    }
    else {
      sendData.isPaidUser = true;
    }

    let isPossibleAddSchedule = await isPossibleAdd(data.eventId, {start: data.startTime, end: data.endTime});
    sendData.isPossibleAddSchedule = isPossibleAddSchedule;

    res.status(200).json(sendData);
  }
  else {
    res.status(404).json({ message: `meeting id(${id}) not found`});
  }
}

export async function getMeetingByCode(req: IRequest, res: Response, next: NextFunction) {
  const code = req.params.code;
  const status = req.query.status;

  try {
    const data = await meetingRepo.getByCode(code);
    if (!data) {
      return res.status(409).json({ message: `meeting code:(${code}) not found`});
    }

    let isPossibleAddSchedule = await isPossibleAdd(data.eventId, {start: data.startTime, end: data.endTime});

    if (status !== 'replan') {
      return res.status(200).json({data, isPossibleAddSchedule});
    }

    const eventId = data.eventId;
    if (!eventId) {
      return res.status(409).json({ message: `event is not found`});
    }
    const eventData = await eventRepo.getById(eventId);
    if (!eventData) {
      return res.status(404).json({ message: `wrong event data`});
    }
    
    let sendData: any = {};
    sendData['event_startDate'] = eventData.start_date;
    sendData['event_endDate'] = eventData.end_date;
    sendData['event_restritedTime'] = eventData.restricted_time;

    let tmpML = [];
    let meetTimeList = [];
    const meetList = eventData.meeting_list;
    for (let i = 0; i < meetList.length; i++) {
      let tmpObj: any = {};
      tmpML[i] = JSON.parse(JSON.stringify(meetList[i]));
      if (tmpML[i].status === 'confirm' && tmpML[i].id !== data.id) {
        tmpObj['date'] = tmpML[i].date;
        tmpObj['startTime'] = tmpML[i].startTime;
        tmpObj['endTime'] = tmpML[i].endTime;
        meetTimeList.push(tmpObj);
      }
    }
    sendData['meeting_timeList'] = meetTimeList;
    sendData['isPossibleAddSchedule'] = isPossibleAddSchedule;
    console.log(sendData);
    res.status(200).json({data, sendData});
  }
  catch(e) {
    console.error(`[meetingCtrl][getMeetingByCode] message (${e})`);
    next(e);
  }
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
    return res.status(403).json({ message: `${e}`});
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

  try {
    const meeting = await meetingRepo.getById(mId);
    if (meeting && meeting.status === 'replan') {
      meeting["status"] = mStatus;
      console.log(meeting);

      sendmail(meeting, EMAILTYPE.RESULT)
        .then( value => {
            meetingRepo.updateMeeting(meeting.id, meeting);
            return res.status(200).json({ message: `Success send email: ${meeting.toEmail}`})
        })
        .catch( reason => res.status(500).json({ message: `Failed email send ${reason}`}));
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
  const meetId = req.query.meetId;
  let bodyData = req.body;

  try {
    if (meetId) {
      let meetData = await meetingRepo.getById(meetId);
      if (!meetData) {
        return res.status(409).json({ message: `meeting is not found`});
      }
      if (meetData.status == 'cancel' || meetData.status == 'none') {
        return res.status(403).json({ message: `meeting status(${meetData.status}) is wrong`});
      }
      const eventData = await eventRepo.getById(meetData.eventId);
      if (!eventData) {
        return res.status(409).json({ message: `event is not found, meeting data don't update`});
      }
      if (user_id !== eventData.user_id) {
        return res.status(403).json({ message: 'event owner is different. meeting create fail'});
      }

      meetData.date = bodyData.startTime
      meetData.location = bodyData.location
      meetData.comment = bodyData.comment
      meetData.startTime = bodyData.startTime
      meetData.endTime = bodyData.endTime
      meetData.status = 'none';
      meetData.code = shortid.generate();

      console.log({meetData})

      sendmail(meetData, EMAILTYPE.INVI)
        .then( value => {
          meetingRepo.updateMeeting(meetId, meetData);
          return res.status(200).json({ message: `Success send email: ${meetData?.toEmail}, code(${meetData?.code})`})
        })
        .catch( reason => res.status(500).json({ message: `Failed email send ${reason}`}));
    }
    else {
      const readyMeetingData = await readyCreateMeeting(user_id, bodyData);

      if (bodyData.isMenual === true) {
        createMeeting(readyMeetingData);
        return res.status(200).json({message: 'menual meeting saved !!!!'})
      }

      sendmail(readyMeetingData.revMeeting, EMAILTYPE.INVI)
        .then( value => { 
          createMeeting(readyMeetingData);
          return res.status(200).json({ message: `Success send email: ${readyMeetingData.revMeeting.toEmail}, code(${readyMeetingData.revMeeting.code})`})
        })
        .catch( reason => res.status(500).json({ message: `Failed email send ${reason}`}));
    }
  }
  catch(e) {
    console.error(`[meetingCtrl][sendInvitMail] ${e}`);
    return res.status(500).json({ message: `[meetingCtrl][sendInvitMail] ${e}`});
  }
}

export async function deleteMeetings(eventId: string) {
  return meetingRepo.deleteMeetings(eventId);
}

async function readyCreateMeeting(userId: string, body: any) {
  const user = await authRepo.findById(userId);
  if (!user) {
    throw new Error('message: User is not found');
  }

  const event = await eventRepo.getById(body.eventId);
  if (!event) {
    throw new Error('Not found event');
  }

  if (userId !== event.user_id) {
    throw new Error('event owner is different. meeting create fail');
  }

  let toUserImage;
  const toUser = await authRepo.findByEmail(body.toEmail);
  if (toUser) {
    toUserImage = toUser.photo_path;
  }

  let profilePhone;
  let profileCompany;
  const profile = await profileRepo.findById(user.profile);
  if (profile) {
    profilePhone = profile.phone ? profile.phone : 'empty';
    profileCompany = profile.company ? profile.company : 'empty';
  }

  let revMeeting = {
    ownerId: user.id,
    ownerEmail: user.email,
    ownerName: user.username,
    ownerPhone: profilePhone,
    ownerCompany: profileCompany,
    toEmail: body.toEmail,
    toImage: toUserImage,
    toPhone: body.toPhone,
    toName: body.toName,
    toCompany: body.toCompany,
    eventId: body.eventId, 
    title: body.title,
    date: body.date, 
    startTime: body.startTime,
    endTime: body.endTime,
    location: body.location, 
    comment: body.comment,
    status: 'none',
    code: shortid.generate()
  };

  return {revMeeting, toUserImage};
}

async function createMeeting(meetingData: any) {
  
  const meeting = await meetingRepo.createMeeting(meetingData.revMeeting);
  if (!meeting) {
    throw new Error('Failed create meeting');
  }

  const event = await eventRepo.getById(meetingData.revMeeting.eventId);
  if (!event) {
    throw new Error('Not found event');
  }  

  let meetingList: string[] = [meeting.id, ...event.meeting_list];
  const eventUpdate = await eventRepo.updateEvent(meeting.eventId, {meeting_list: meetingList});
  if (!eventUpdate) {
    throw new Error('Failed meeting list update');
  }

  const retMeetingData = {
    ...meetingData.revMeeting,
    ownerPhoto: meetingData.toUserImage
  };
  return retMeetingData;
}

let isPossibleAdd = async (eventId: string, time: any) => {
  let restrictedTime, retValue;
  const event = await eventRepo.getById(eventId);

  let year, month, day, hours, minutes, seconds;
  time.start = new Date(time.start);
  year = time.start.getFullYear();
  month = time.start.getMonth();
  day = time.start.getDate();
  hours = time.start.getHours();
  minutes = time.start.getMinutes() + 1;
  time.start = new Date(year, month, day, hours, minutes);

  time.end = new Date(time.end);
  year = time.end.getFullYear();
  month = time.end.getMonth();
  day = time.end.getDate();
  hours = time.end.getHours();
  minutes = time.end.getMinutes() - 1;
  time.end = new Date(year, month, day, hours, minutes);
   
  if (event) {
    restrictedTime = event.restricted_time;
    const meetingList = JSON.parse(JSON.stringify(event.meeting_list));
    for (let i = 0; i < meetingList.length; i++) {
      if (meetingList[i].status === 'confirm') {
        let value;
        value = { start: meetingList[i].startTime, end: meetingList[i].endTime};
        restrictedTime.push(value);
      }
    }
  }

  retValue = restrictedTime?.find((item) => {
    return ( 
      isWithinInterval(new Date(time.start), {
        start: new Date(item.start),
        end: new Date(item.end)
      }) || 
      isWithinInterval(new Date(time.end), {
        start: new Date(item.start),
        end: new Date(item.end)
      })
    )
  })
  return !retValue;
}