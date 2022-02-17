import mongoose, { Types, Date, Model } from 'mongoose'

interface IEmailAuth {
  userid: string;
  email: string;
  code: string;
  logged: boolean;
  createdAt: number;
}

const emailAuthSchema = new mongoose.Schema<IEmailAuth, Model<IEmailAuth>>({
    userid: { type: String, required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    logged: { type: Boolean, default: false }
  },
  {
    timestamps: { updatedAt: false, createdAt: true },
    versionKey: false
  })

const EmailAuth = mongoose.model('EmailAuth', emailAuthSchema)

export async function saveAuthMaiil(_mailInfo: { code: string; logged: boolean; userid: string; email: string }) {
  return new EmailAuth(_mailInfo).save()
}

export async function updateAuthMail(_code: string, data: any) {
  return EmailAuth.findOneAndUpdate({ code: _code }, data, { new: true })
}

export async function findAuthMail(_code: string) {
  return EmailAuth.findOne({ code: _code }, { _id: false })
}
