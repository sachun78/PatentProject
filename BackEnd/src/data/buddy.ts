import mongoose, { Schema } from 'mongoose';
import * as authRepo  from 'data/auth';

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
})

const Buddy = mongoose.model('Buddy', buddySchema);

export function createBuddy(userId: string, buddy: any) {
  return authRepo.findById(userId).then((user) => {
    return new Buddy({
      owner_id: userId,
      buddy: buddy
    }).save();
  });
}

export function findById(buddyId: string) {
  return Buddy.findById(buddyId);
}

export function updateBuddy(buddyId: string, arrBuddy: string[]) {
  return Buddy.findOneAndUpdate({buddy: arrBuddy});
}

export function getBuddy(userId: string) {
  return Buddy.findOne({owner_id: userId}, {_id: false}).populate({path: 'buddy.profile', model: 'Profile'});
}