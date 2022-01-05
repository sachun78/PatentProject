import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  password: String,
  name: String,
  id: String,
});

const NoticeSchema = new mongoose.Schema({
  noti: String,
  name: String,
  date: String,
});

export { UserSchema, NoticeSchema };
