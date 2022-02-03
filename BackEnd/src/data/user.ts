import mongoose from 'mongoose'
import { useVirtualId } from 'database/database'

const SALT_FACTOR = 10

interface IUser {
  username: string;
  email: string;
  password_hash: string;
  company?: string;
  department?: string;
  position?: string;
  history?: string;
  field?: string[];
  photo_path?: string;
  status: 0 | 1 | 2 | 3;  // TODO(User 상태 정의)
  certified: boolean;
  country?: string;
}

export const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String, required: true
  },
  email: {
    type: String, required: true, unique: true,
  },
  password_hash: {
    type: String, required: true
  },
  company: { type: String, default: '' },      // 회사
  department: { type: String, default: '' },   // 부서
  position: { type: String, default: '' },     // 직급
  history: { type: String, default: '' },  // 이전 이력
  field: { type: [String], default: [] },      // 분야
  photo_path: { type: String, default: '' },    // 프로필 사진 위치
  status: { type: Number, enum: [0, 1, 2], default: 1 },       // 0 - 삭제된 유저, 1 - 정상 등록 유저, 2 - 휴먼 유저
  certified: { type: Boolean },
  country: { type: String }       // 국가
}, { timestamps: true })

useVirtualId(userSchema)

const User = mongoose.model('User', userSchema)

export async function findByEmail(email: string) {
  return User.findOne({email:email})
}

export async function findById(id: string) {
  return User.findById(id)
}

export async function createUser(user: IUser) {
  return new User(user).save().then((data: any) => data.id)
}
