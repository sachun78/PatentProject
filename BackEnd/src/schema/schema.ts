import mongoose from "mongoose";

const validator = require("validator");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true,
    validate(value:String){
      if(value.length < 3 || value.length > 255)
      throw new Error("name lenth error");
    }
  },
  email: {type: String, required: true, unique: true,
    validate(value:String){
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {type: String, required: true,
    validate(value:String){
      if(value.length < 8)
      throw new Error("password lenth error");
    }
  },
  date: {type: Date},
  company: {type: String},      // 회사
  department: {type: String},   // 부서
  position: {type: String},     // 직급
  prevhistory: {type: String},  // 이전 이력
  field: {type: [String]},      // 분야
  photopath: {type: String},    // 프로필 사진 위치
  status: {type: Number},       // 0 - 삭제된 유저, 1 - 정상 등록 유저, 2 - 휴먼 유저
  country: {type: String}       // 국가
});

//모델이 저장되기("save") 전(.pre)에 실행되는 함수
UserSchema.pre("save",function(done){
  let user = this;
  if(!user.isModified("password")){
    return done();
  }
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  done();
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


MyNetworkSchema.methods.saveMyNetworkUserIncrease = function(bodyData) {
  console.log(bodyData.meetpeople[0].email)
  console.log('==================================')
  console.log(this)
  const total:string = this;
  const word = bodyData.meetpeople[0].email;
  console.log(word)
    if(total.includes(word) == true){
      console.log('-------------- find people')
    } else{
      console.log('-------------- not found people')
    }

    // findOne({"meetpeople":{"$elemMatch":{"email": bodyData.meetpeople[0].email}}})
    // .then((result:any) => {
    //   console.log('-------------- Start increase')
    //   bodyData.findOneAndUpdate({"meetpeople":{"$elemMatch":{"email": bodyData.meetpeople[0].email}}}, {$inc:{"meetpeople.$.meetcount": 1}}, {returnNewDocument: true});
    // })
    // .catch((error:any) => {
    //   console.log('-------------- Start push')
    //   bodyData.findOneAndUpdate({$push:{"meetpeople": bodyData.meetpeople[0]}}, {returnNewDocument: true});
    // })
}

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
