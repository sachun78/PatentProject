import mongoose, { Schema } from 'mongoose';
import * as authRepo  from 'data/auth';
import { useVirtualId } from 'database/database';

export interface IBuddy {
  owner_id: string
  buddy: any[]
}

export const buddySchema = new mongoose.Schema<IBuddy>({
  owner_id: { type: String, required: true },
  //buddy: [Schema.Types.Mixed]
  buddy: [{ 
    email: { type: String, default: ''},
    profile: { type: String, default: ''}
  }]
},{
  versionKey: false
});
useVirtualId(buddySchema);

const Buddy = mongoose.model('Buddy', buddySchema);

export async function createBuddy(userId: string, buddy: any) {
  return authRepo.findById(userId).then((user) => {
    return new Buddy({
      owner_id: userId,
      buddy: buddy
    }).save();
  });
}

export async function findById(buddyId: string) {
  return Buddy.findById(buddyId).lean();
}

export async function updateBuddy(buddyId: string, arrBuddy: string[]) {
  return Buddy.findByIdAndUpdate(buddyId, {buddy: arrBuddy}, {new: true}).lean();
}

export async function getBuddy(userId: string) {
  return Buddy.findOne({owner_id: userId}).lean().populate({path: 'buddy.profile', model: 'Profile'});
}

export async function deleteBuddy(userId: string, _email: string) {
  return Buddy.updateOne({owner_id: userId}, {$pull: {"buddy": {"email": _email}}});
}

// Query an Array of Embedded Documents
export async function getBuddyByEmail(_email: string) {
  return Buddy.find({"buddy.email": _email}, {_id: false});
}