import express from "express";
import mongoose from "mongoose";
import { UserSchema, UserLikeSchema } from "schema/schema";

const route = express.Router();
const validator = require("validator");

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("member");
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// user signup
/////////////////////////////////////////////////////////////////////////////////////////////////////////
route.post("/signup", (req, res) => {
  const user = mongoose.model("members", UserSchema);
  user.findOne(
    { email: req.body.email, password: req.body.password },
    (err: mongoose.CallbackError, resuser: any) => {
      if (err) return res.status(500).json({ message: err.message });
      else if (resuser)
        return res.status(200).json({ message: "아이디가 이미 존재합니다." });
      else {
        const new_user = new user(req.body);
        new_user.save((err: mongoose.CallbackError) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          } else {
            return res.status(200).json({ message: "회원 가입 성공" });
          }
        });
      }
    }
  );
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// user signin
/////////////////////////////////////////////////////////////////////////////////////////////////////////
route.post("/signin", (req, res) => {
  const user = mongoose.model("members", UserSchema);
  user.findOne(
    { email: req.body.email, password: req.body.password },
    (err: mongoose.CallbackError, user: any) => {
      if (err) return res.status(500).json({ message: err.message });
      else if (user) return res.status(200).json({ message: "환영합니다." });
      else
        return res.status(409).json({
          message:
            "가입된 정보를 찾을 수 없습니다. 회원가입을 하시기 바랍니다.",
        });
    }
  );
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Post like
/////////////////////////////////////////////////////////////////////////////////////////////////////////
route.post("/likepostfind", (req, res) => {
  const postlike = mongoose.model("likeposts", UserLikeSchema);
  postlike.findOne({email: req.body.email},
     (err: mongoose.CallbackError, userresult: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (userresult)
      return res.status(409).json({ message: "like user already add!" });
    else {
      const new_postlike = new postlike(req.body);
      new_postlike.save((err: mongoose.CallbackError) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          return res.status(200).json({ message: "like post add success!" });
        }
      });
    }
  });
});

route.post("/userlikepostfind", (req, res) => {
  const postlike = mongoose.model("likeposts", UserLikeSchema);
  postlike.findOne({ $and: [{email: req.body.email}, {"likes":{"$elemMatch":{"id": req.body.likes[0].id}}} ]},
     (err: mongoose.CallbackError, userresult: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (userresult)
      return res.status(200).json({ message: "like post already add!" });
    else
      return res.status(409).json({ message: "like post not found!" });

  });
});

route.post("/userlikepostup", (req, res) => {
  const postlike = mongoose.model("likeposts", UserLikeSchema);
  postlike.findOneAndUpdate({email: req.body.email}, {$push:{"likes": req.body.likes[0]}}, {new: true},
     (err: mongoose.CallbackError, userresult: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (userresult)
    {
      if (!validator.isEmail(req.body.email) || !validator.isEmail(req.body.likes[0].email)) {
        return res.status(500).json({ message: "Email is invalid!" });
      }
      return res.status(200).json({ message: "like post add!" });
    } else {
      return res.status(500).json({ message: "like post add error!" });
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// User like
/////////////////////////////////////////////////////////////////////////////////////////////////////////
route.post("/likeuserfind", (req, res) => {
  const userlike = mongoose.model("likeusers", UserLikeSchema);
  userlike.findOne({email: req.body.email},
     (err: mongoose.CallbackError, userresult: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (userresult)
      return res.status(409).json({ message: "like user already add!" });
    else {
      const new_userlike = new userlike(req.body);
      new_userlike.save((err: mongoose.CallbackError) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          return res.status(200).json({ message: "like user add success!" });
        }
      });
    }
  });
});

route.post("/userlikeuserfind", (req, res) => {
  const userlike = mongoose.model("likeusers", UserLikeSchema);
  userlike.findOne({ $and: [{email: req.body.email}, {"likes":{"$elemMatch":{"email": req.body.likes[0].email}}} ]},
     (err: mongoose.CallbackError, userresult: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (userresult)
      return res.status(200).json({ message: "like user already add!" });
    else
      return res.status(409).json({ message: "like user not found!" });

  });
});

route.post("/userlikeuserup", (req, res) => {
  const userlike = mongoose.model("likeusers", UserLikeSchema);
  userlike.findOneAndUpdate({email: req.body.email}, {$push:{"likes": req.body.likes[0]}}, {new: true},
     (err: mongoose.CallbackError, userresult: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (userresult){
      if (!validator.isEmail(req.body.email) || !validator.isEmail(req.body.likes[0].email)) {
        return res.status(500).json({ message: "Email is invalid!" });
      }
      return res.status(200).json({ message: "like user add!" });
    } else {
    return res.status(500).json({ message: "like user add error!" });
  }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// find name
/////////////////////////////////////////////////////////////////////////////////////////////////////////
route.post("/findname", (req, res) => {
  const user = mongoose.model("members", UserSchema);
  user.find(
    { email: {$regex: '.*' + req.body.name + '.*'} },
    (err: mongoose.CallbackError, user: any) => {
      if (err) return res.status(500).json({ message: err.message });
      else if (user) return res.status(200).json({ message: "find user", data: user });
      else
        return res.status(409).json({
          message:
            "not found user",
        });
    }
  );
});

export default route;
