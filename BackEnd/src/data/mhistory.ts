import mongoose from 'mongoose';
import * as meetingRepo from 'data/meeting';

interface IMhistory {
  with: [string],
  result: string,
  photopath: string
};

export const mhistoryScheme = new mongoose.Schema<IMhistory>({
  with: { type: [String], default: ["test1"]},
  result: { type: String, require: true},
  photopath: { type: String, required: true}
}, {
  timestamps: false,
  versionKey: false
});

const mhistory = mongoose.model('mhistory', mhistoryScheme);

export async function createMhistory(_history: IMhistory) {
  return new mhistory({
    ..._history,
  }).save();
}

export async function updateMhistory(userId: string, data: IMhistory) {

}