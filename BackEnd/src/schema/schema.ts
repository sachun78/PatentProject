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

export { UserSchema, NoticeSchema, PostSchema, UserLikeSchema };
