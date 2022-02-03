import mongoose from 'mongoose'
import { eventSchema, IEvent } from './event'

interface IMeeting {
  applier_id: string
  applied_id: string
  applier_email: string
  applied_email: string

  event: IEvent
  date: Date
  time: string,
  location: string,

  guests: string[]
  comment: string
  status: 'confirm_apply' | 'confirm_fixed' | 'fix_apply_me' | 'fix_apply_counter' | 'cancel_apply' | 'cancel_complete'
  is_meet: boolean
  photo: string
  name_card: string
}

export const meetingSchema = new mongoose.Schema<IMeeting>({
  applier_id: { type: String, required: true },
  applied_id: { type: String, required: true },

  applier_email: { type: String, required: true },
  applied_email: { type: String, required: true },

  event: { type: eventSchema, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },

  guests: { type: [String] },
  comment: { type: String },

  status: {
    type: String,
    enum: ['confirm_apply', 'confirm_fixed', 'fix_apply_me', 'fix_apply_counter', 'cancel_apply', 'cancel_complete'],
    default: 'confirm_apply'
  },

  is_meet: { type: Boolean },
  photo: { type: String },
  name_card: { type: String }
}, { timestamps: true })

const meeting = mongoose.model('meetings', meetingSchema)

export function saveMeeting(bodyData: any) {
  const new_meeting = new meeting(bodyData)
  return new_meeting.save()
}

export function findMeetingMySchedule(email: string) {
  return meeting.find({ email })
}
//
// export function findMeetingUserAll(meeting: IMeeting) {
//   return meeting.find({ $or: [{ email: meeting.email }, { guests: { email: meeting.email } }] })
// }
