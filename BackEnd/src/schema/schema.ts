import mongoose from "mongoose";

const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, 
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {type: String, required: true},
  company: {type: String, required: true},
  department: {type: String, required: true},
  position: {type: String, required: true},
  tel: {type: String},
  country: {type: String, trim: true, required: true}
});

const MeetPeopleSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String,
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  company: {type: String},
  department: {type: String},
  position: {type: String},
  tel: {type: String},
  country: {type: String, trim: true},
  meetcount: {type: Number}
});

const EventSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, 
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  startdate: {type: Date, required: true},
  enddate: {type: Date, required: true},
  comment: {type: String}
});

const MyNetworkSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, 
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  meetpeople: {type: [MeetPeopleSchema]}
});

const NoticeSchema = new mongoose.Schema({
  noti: {type: String, required: true},
  name: {type: String, required: true},
  date: {type: Date, required: true}
});

const PostSchema = new mongoose.Schema({
  email: {type: String, required: true, 
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  postmessage: {type: String},
  postdate: {type: Date, required: true},
  likecount: {type: Number}
});

const IDSchema = new mongoose.Schema({
  id: {type: String, required: true},
  email: {type: String, required: true, 
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  }
});

const UserLikeSchema = new mongoose.Schema({
  email: {type: String, required: true, 
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  likes: {type: [IDSchema]}
});

const MeetingUserSchema = new mongoose.Schema({
  name: {type: String},
  company: {type: String},
  email: {type: String,
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  tel: {type: String},
  member: {type: Boolean}
});

const MeetingSchema = new mongoose.Schema({
  email: {type: String, required: true, 
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  event: {type: EventSchema, required: true},
  date: {type: Date, required: true},
  time: {type: String, required: true},
  location: {type: String, required: true},
  photofolder: {type: String},
  cardfolder: {type: String},
  comment: {type: String},
  withmycompany: {type: [MeetingUserSchema]},
  guests: {type: [MeetingUserSchema]},
  confirm: {type: Boolean},
  ismeet: {type: Number},
});

export {
  UserSchema,
  NoticeSchema,
  PostSchema,
  UserLikeSchema,
  MeetingSchema,
  MeetingUserSchema,
  MeetPeopleSchema,
  MyNetworkSchema,
  EventSchema,
  IDSchema
};
