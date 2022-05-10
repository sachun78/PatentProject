import mongoose, { model } from 'mongoose';
import * as authRepo  from 'data/auth';

interface IProfile {
  userid: string,
  company?: string;
  department?: string;
  position?: string;
  history?: string;
  field?: string[];
  status: -1 | 0 | 1 | 2;  // TODO(User 상태 정의)
  country?: string;
  phone?: string;
  signature: string;
}
  
export const profileScheme = new mongoose.Schema<IProfile>({
  userid: { type: String, required: true },
  company: { type: String, default: '' },       // 회사
  department: { type: String, default: '' },    // 부서
  position: { type: String, default: '' },      // 직급
  history: { type: String, default: '' },       // 이전 이력
  field: { type: [String], default: [] },       // 분야
  status: { type: Number, enum: [-1, 0, 1, 2], default: -1 },       // -1: 할당 안됨, 0: 삭제된 유저, 1: 정상 등록 유저, 2: 휴먼 유저
  country: { type: String, default: '' },       // 국가
  phone: { type: String, default: ""},          // 전화번호
  signature: { type: String, default: ""}// 미팅 요청시에 comment 입렵 없을 경우 signature 사용
}, 
{ 
  timestamps: true,
  versionKey: false
})

const Profile = mongoose.model('Profile', profileScheme);
export const defaultProfile = new Profile({
  company: "",
  department: "",
  position: "",
  history: "",
  field: [],
  status: -1,
  country: "",
  phone: '',
  signature: '',
  userid: '',
});

export async function createProfile(_profile: IProfile, userId: string) {
  return authRepo.findById(userId).then((user) => {
      return new Profile({
          ..._profile,
          userid: userId,
      }).save()
  });
}

export async function updateProfile(userid: string, data: IProfile) {
  return Profile.findOneAndUpdate({userid}, data, {new: true}).lean();
}

export async function getProfile(userId: string) {
  return Profile.findOne({userid: userId},{_id: false}).lean();
}

export async function findById(id: string) {
  return Profile.findById(id).lean();
}