import mongoose from "mongoose";
import * as authRepo  from 'data/auth';
import { useVirtualId } from 'database/database'

export interface IEvent {
    user_id: string,
    title: string,
    start_date: Date,
    end_date: Date,
    meeting_list?: string[]
}

export const eventSchema = new mongoose.Schema<IEvent>({
    user_id: {type: String},
    title: {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    meeting_list: {type: [String], default: []}
}, 
{
  timestamps: true,
  versionKey: false
});
useVirtualId(eventSchema);

const Event = mongoose.model("Event", eventSchema);

export async function getAll() {
  return Event.find().sort({createAt: -1});
}

export async function getAllByMonth(month: string) {
  const yy = parseInt(month.split('/')[0]);
  const mm = parseInt(month.split('/')[1]);

  const rngStart = new Date(yy + '/' + mm);
  const rngEnd = new Date(yy + '/' + (mm + 1));
  
  return Event.find().or([
        {start_date: {$gt: rngStart, $lte: rngEnd}},
        {end_date: {$gt: rngStart, $lte: rngEnd}} ]);
}

export async function getById(eventId: string) {
  return Event.findById(eventId);
}

export async function findByData(eventData: IEvent) {
  return Event.findOne(eventData);
}

export async function createEvent(eventData: IEvent, userId: string) {
  return authRepo.findById(userId).then((user) => {
      return new Event({
          ...eventData,
          user_id: user?.id,
      }).save()
  });
}

export async function updateEvent(eventId: string, data: any) {
  return Event.findByIdAndUpdate(eventId, data, {new: true});
}

export async function deleteEvent(eventId: string) {
  return Event.findByIdAndDelete(eventId);
}