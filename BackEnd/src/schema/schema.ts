import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  company: String,
  department: String,
  position: String,
  tel: String,
  country: String,
});

const NoticeSchema = new mongoose.Schema({
  noti: String,
  name: String,
  date: String,
});

const PostSchema = new mongoose.Schema({
  email: String,
  postmessage: String,
  postdate: String,
  likecount: Number,
});

const UserLikeSchema = new mongoose.Schema({
  email: String,
  likeposts: [String],
});

const MeetingUserSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  tel: String,
  member: Boolean,
});

const MeetingSchema = new mongoose.Schema({
  email: String,
  event: String,
  date: String,
  time: String,
  location: String,
  photofolder: String,
  cardfolder: String,
  withmycompany: [MeetingUserSchema],
  guests: [MeetingUserSchema],
  confirm: Boolean,
  ismeet: Number,
});

export {
  UserSchema,
  NoticeSchema,
  PostSchema,
  UserLikeSchema,
  MeetingSchema,
  MeetingUserSchema,
};
