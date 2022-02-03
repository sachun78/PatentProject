import mongoose, { Types } from 'mongoose'

interface IEmailAuth {
  user_id: Types.ObjectId,
  code: string,
}

const emailAuthSchema = new mongoose.Schema<IEmailAuth>({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  code: { type: String, required: true }
}, { timestamps: { updatedAt: false, createdAt: true } })

const EmailAuth = mongoose.model('EmailAuth', emailAuthSchema)

export async function createEmailAuth(user_id: string) {
  //TODO(make code)
  const code = {
    user_id,
    code: 'ABCDE'
  }
  return new EmailAuth(code).save().then((data) => data.code)
}
