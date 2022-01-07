import express from "express";
import mongoose from "mongoose";
import { UserSchema } from "schema/schema";
import { UserLikeSchema } from "schema/schema";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("member");
  }
);

route.post("/signup", (req, res) => {
  const user = mongoose.model("members", UserSchema);
  user.findOne(
    { email: req.body.email, password: req.body.password },
    (err: any, user: any) => {
      if (err) return res.status(500).json({ message: "error!!" });
      else if (user)
        return res.status(200).json({ message: "아이디가 이미 존재합니다." });
      else {
        const new_user = new user(req.body);
        new_user.save((err: any) => {
          if (err) {
            return res.status(500).json({ message: "회원 가입 실패" });
          } else {
            return res.status(200).json({ message: "회원 가입 성공" });
          }
        });
      }
    }
  );
});

route.post("/signin", (req, res) => {
  const user = mongoose.model("members", UserSchema);
  user.findOne(
    { email: req.body.email, password: req.body.password },
    (err: any, user: any) => {
      if (err) return res.status(500).json({ message: "error!!" });
      else if (user) return res.status(200).json({ message: "환영합니다." });
      else
        return res.status(409).json({
          message:
            "가입된 정보를 찾을 수 없습니다. 회원가입을 하시기 바랍니다.",
        });
    }
  );
});

route.post("/likeup", (req, res) => {
  const userlike = mongoose.model("likeup", UserLikeSchema);
  userlike.findOne({ email: req.body.email }, (err: any, userlike: any) => {
    if (err) return res.status(500).json({ message: "error!!" });
    else if (userlike)
      return res.status(200).json({ message: "like add success!" });
    else {
      const new_userlike = new userlike(req.body);
      new_userlike.save((err: any) => {
        if (err) {
          return res.status(500).json({ message: "like add error!!" });
        } else {
          return res.status(200).json({ message: "like add success!" });
        }
      });
    }
  });
});

export default route;
