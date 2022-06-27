import mongoose from "mongoose";
import * as authRepo  from 'data/auth';
import { useVirtualId } from 'database/database'

export interface IEvent {
    user_id: string,
    title: string,
    start_date: Date,
    end_date: Date,
    restricted_time: any[],
    meeting_list: string[]
};

export const eventSchema = new mongoose.Schema<IEvent>({
    user_id: {type: String},
    title: {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    restricted_time: [{
      start: { type: Date, default: ''},
      end: { type: Date, default: ''},
    }],
    meeting_list: {type: [String], ref: 'meetings', default: []}
}, 
{
  timestamps: true,
  versionKey: false
});
useVirtualId(eventSchema);

const Event = mongoose.model("Event", eventSchema);

export async function getAll(userId: string) {
  return Event.find({user_id: userId}).lean().sort({createAt: -1});
}

export async function getAllByMonth(userId: string, month: string) {
  const yy = parseInt(month.split('/')[0]);
  const mm = parseInt(month.split('/')[1]);

  const rngStart = new Date(yy + '/' + mm);
  const rngEnd = new Date(yy + '/' + (mm + 1));
  
  return Event.find({user_id: userId}).or([
        {start_date: {$gt: rngStart, $lte: rngEnd}},
        {end_date: {$gt: rngStart, $lte: rngEnd}} ]);
}

export async function getById(eventId: string) {
  return Event.findById(eventId).then((value) => {
    if (value?.meeting_list) {
      return Event.findById(eventId).populate('meeting_list');
    }
    else {
      return value;
    }
  })
}

export async function findByData(_title: string, startDate: Date, endDate: Date,) {
  return Event.findOne({title: _title, start_date: startDate, end_date: endDate}).lean();
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
  return Event.findByIdAndUpdate(eventId, data, {new: true}).lean();
}

export async function deleteEvent(eventId: string) {
  return Event.findByIdAndDelete(eventId);
}