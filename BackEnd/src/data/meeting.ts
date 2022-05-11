import mongoose from 'mongoose'
import * as authRepo  from 'data/auth';
import { useVirtualId } from 'database/database'

export interface IMeeting {
  ownerId: string,
  ownerName: string,
  ownerEmail: string,
  ownerPhone: string,
  ownerCompany: string,
  toEmail: string,
  toImage: string,
  toPhone: string,
  eventId: string,
  title: string,
  date: Date,
  startTime: string,
  endTime: string,
  location: string,
  comment: string,
  status: 'none' | 'confirm' | 'cancel' | 'replan',
  code: string,
  history: string
};

export const meetingSchema = new mongoose.Schema<IMeeting>({
  ownerId: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  ownerCompany: { type: String, required: true },
  toEmail: { type: String, required: true },
  toImage: { type: String, default: '' },
  toPhone: { type: String, default: '' },
  eventId: { type: String, requierd: true },
  title: { type: String, defalut: ""},
  date: { type: Date, required: true },
  startTime: { type: String, requierd: true },
  endTime: { type: String, requierd: true },
  location: { type: String, requierd: true },
  comment: { type: String, requierd: true },
  status: { type: String, enum: ['none', 'confirm', 'cancel', 'replan'], default: 'none' },
  code: { type: String, requierd: true },
  history: { type: String, ref: "mhistory", default: ""}
},{
  timestamps: true,
  versionKey: false
});
useVirtualId(meetingSchema);

const meeting = mongoose.model('meetings', meetingSchema);

export async function getAll(userId: string) {
    return meeting.find({ownerId: userId}).lean().sort({date: -1});

  // if (filter._toEmail) {
  //   return meeting.find({ownerId: userId})
  //     .regex('toEmail', new RegExp(filter._toEmail))
  //     .skip(curPos).limit(cnt)
  //     .lean().sort({date: -1});
  // }
  // else if (filter._title) {
  //   return meeting.find({ownerId: userId})
  //     .regex('title', new RegExp(filter._title))
  //     .skip(curPos).limit(cnt)
  //     .lean().sort({date: -1});
  // }
  // else {
  //   return meeting.find({ownerId: userId})
  //     .skip(curPos).limit(cnt)
  //     .lean().sort({date: -1});
  // }
}

export async function getAllByIndex(userId: string, curPos: number, cnt: number) {
  return meeting.find({ownerId: userId}).lean().sort({date: -1}).skip(curPos).limit(cnt);
}

export async function getById(meetingId: string) {
  return meeting.findById(meetingId).then((value) => {
    console.log(value);
    if (value?.history) {
      return meeting.findById(meetingId).populate('history');
    }
    else {
      return value;
    }
  })
}

export async function getByCode(meetingCode: string) {
  return meeting.findOne({code: meetingCode});
}

export async function createMeeting(meetingData: any) {
  return new meeting(meetingData).save().then((data: any) => {
    return {
      id: data.id,
      ownerId: data.ownerId,
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerPhone: data.ownerPhone,
      ownerCompany: data.ownerCompany,
      toEmail: data.toEmail,
      toImage: data.toImage,
      toPhone: data.toPhone,
      eventId: data.eventId,
      title: data.title,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      comment: data.comment,
      status: data.status,
      code: data.code
    }
  });
}

export async function updateMeeting(meetingId: string, data: any) {
  return meeting.findByIdAndUpdate(meetingId, data, {new: true}).lean();
}

export async function deleteMeeting(meetingId: string) {
  return meeting.findByIdAndDelete(meetingId);
}

export async function deleteMeetings(_eventId: string) {
  return meeting.deleteMany({eventId: _eventId});
}