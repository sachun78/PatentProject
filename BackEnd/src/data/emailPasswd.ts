import mongoose, { Types, Date, Model } from 'mongoose'
import { useVirtualId } from 'database/database';

interface IEmailPasswd {
  email: string,
  code: string,
  logged: boolean,
  createdAt: number,
  updatedAt: number
}

const EmailPasswdSchema = new mongoose.Schema<IEmailPasswd, Model<IEmailPasswd>>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  logged: { type: Boolean, default: false },
},
{
  timestamps: true,
  versionKey: false
});
useVirtualId(EmailPasswdSchema);

const EmailPasswd = mongoose.model('EmailPasswd', EmailPasswdSchema)

export async function saveEmailPasswd(_mailInfo: { code: string; logged: boolean; email: string }) {
  return new EmailPasswd(_mailInfo).save();
}

export async function updateEmailPasswd(_code: string, data: any) {
  return EmailPasswd.findOneAndUpdate({ code: _code }, data, { new: true }).lean();
}

export async function findEmailPasswd(_code: string) {
  return EmailPasswd.findOne({ code: _code });
}

export async function findByEmail(_email: string) {
  return EmailPasswd.findOne({ email: _email});
}

export async function deleteEmailPasswd(email: string) {
  return EmailPasswd.deleteMany({email: email});
}