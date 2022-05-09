import mongoose, { Model } from 'mongoose';
import { useVirtualId } from 'database/database';

const SALT_FACTOR = 10

interface IUser {
  username: string;
  email: string;
  password: string;
  photo_path?: string;
  certified: boolean;
  profile: string;
}

export const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo_path: { type: String, default: '' },    // 프로필 사진 위치
  certified: { type: Boolean, default: false },
  profile: { type: String, default: '', ref: 'Profile'}
}, 
{ 
  timestamps: true,
  versionKey: false, 
})
useVirtualId(userSchema);

const User = mongoose.model('User', userSchema);

export async function getUserAll() {
  return User.find().lean().populate('profile');
}

export async function getUserAllIndex(curPos: number, cnt: number) {
  return User.find().lean().skip(curPos).limit(cnt).populate('profile');
}

export async function findByEmail(email: string) {
  return User.findOne({ email: email });
}

export async function findById(id: string) {
  return User.findById(id);
}

export async function createUser(user: IUser) {
  return new User(user).save().then((data: any) => {
    return {
      id: data.id,
      email: data.email,
      certified: data.certified,
      username: data.username
    }
  });
}

export async function updateUser(id: string, data: any) {
  return User.findByIdAndUpdate(id, data, {new: true}).lean();
}

