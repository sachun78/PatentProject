import mongoose from 'mongoose';
import { useVirtualId } from 'database/database';

interface IMhistory {
  with: [string],
  status: boolean,
  result: string,
  photopath: string
};

export const mhistoryScheme = new mongoose.Schema<IMhistory>({
  with: { type: [String], default: ["test1"]},
  status: { type: Boolean, require: true},
  result: { type: String, require: true},
  photopath: { type: String, default: ''}
}, {
  timestamps: false,
  versionKey: false
});
useVirtualId(mhistoryScheme);

const mhistory = mongoose.model('mhistory', mhistoryScheme);

export async function createMhistory(_history: IMhistory) {
  return new mhistory({
    ..._history,
  }).save();
}

export async function updateMhistory(userId: string, data: IMhistory) {

}