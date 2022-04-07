import mongoose from 'mongoose'
import * as authRepo  from 'data/auth';
import { useVirtualId } from 'database/database'

export interface IMeeting {
  ownerId: string,
  ownerName: string,
  ownerEmail: string,
  toEmail: string,
  eventId: string,
  title: string,
  date: Date,
  time: string,
  location: string,
  comment: string,
  status: 'none' | 'confirm' | 'cancel',
  code: string,
  history: string
};

export const meetingSchema = new mongoose.Schema<IMeeting>({
  ownerId: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  toEmail: { type: String, required: true },
  eventId: { type: String, requierd: true },
  title: { type: String, defalut: ""},
  date: { type: Date, required: true },
  time: { type: String, requierd: true },
  location: { type: String, requierd: true },
  comment: { type: String, requierd: true },
  status: { type: String, enum: ['none', 'confirm', 'cancel'], default: 'none' },
  code: { type: String, requierd: true },
  history: { type: String, ref: "mhistory", default: ""}
},{
  timestamps: true,
  versionKey: false
});
useVirtualId(meetingSchema);

const meeting = mongoose.model('meetings', meetingSchema);

export async function getAll(userId: string, data?: any) {
  if (!data) {
    return meeting.find({ownerId: userId}).sort({createAt: -1});
  }

  let filters: any = {ownerId: userId};
  Object.assign(filters, data.filter);

  return meeting.find(filters).sort(data.sort);
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

export async function findByCode(code: string) {
  return meeting.findOne({code});
}

export async function createMeeting(meetingData: any) {
  return new meeting(meetingData).save().then((data: any) => {
    return {
      id: data.id,
      ownerId: data.ownerId,
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      toEmail: data.toEmail,
      eventId: data.eventId,
      title: data.title,
      date: data.date,
      time: data.time,
      location: data.location,
      comment: data.comment,
      status: data.status,
      code: data.code
    }
  });
}

export async function updateMeeting(meetingId: string, data: any) {
  return meeting.findByIdAndUpdate(meetingId, data, {new: true});
}

export async function deleteMeeting(meetingId: string) {
  return meeting.findByIdAndDelete(meetingId);
}