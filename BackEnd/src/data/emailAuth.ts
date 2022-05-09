import mongoose, { Types, Date, Model } from 'mongoose'
import { useVirtualId } from 'database/database';

interface IEmailAuth {
  email: string;
  code: string;
  logged: boolean;
  createdAt: number;
}

const emailAuthSchema = new mongoose.Schema<IEmailAuth, Model<IEmailAuth>>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  logged: { type: Boolean, default: false }
},
{
  timestamps: { updatedAt: false, createdAt: true },
  versionKey: false
});
useVirtualId(emailAuthSchema);

const EmailAuth = mongoose.model('EmailAuth', emailAuthSchema)

export async function saveAuthMaiil(_mailInfo: { code: string; logged: boolean; email: string }) {
  return new EmailAuth(_mailInfo).save();
}

export async function updateAuthMail(_code: string, data: any) {
  return EmailAuth.findOneAndUpdate({ code: _code }, data, { new: true }).lean();
}

export async function findAuthMail(_code: string) {
  return EmailAuth.findOne({ code: _code });
}

export async function findByEmail(_email: string) {
  return EmailAuth.findOne({ email: _email});
}

export async function deleteAuthMail(email: string) {
  return EmailAuth.deleteMany({email: email});
  //return EmailAuth.findByIdAndDelete(id);
}