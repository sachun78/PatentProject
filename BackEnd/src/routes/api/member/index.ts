import express from "express";
import mongoose from "mongoose";
import { UserSchema } from "schema/schema";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("member");
  }
);

route.post("/signup", (req, res) => {
  const user = mongoose.model("members", UserSchema);
  const new_user = new user(req.body);
  new_user.save((err: any) => {
    if (err) {
      return res.status(500).json({ message: "회원 가입 실패" });
    } else {
      return res
        .status(200)
        .json({ message: "회원 가입 성공", data: new_user });
    }
  });
});

route.post("/signin", (req, res) => {
  const user = mongoose.model("members", UserSchema);
  user.findOne(
    { email: req.body.email, password: req.body.password },
    (err: any, user: any) => {
      if (err) return res.status(500).json({ message: "error!!" });
      else if (user)
        return res.status(200).json({ message: "${user.name} 환영합니다." });
      else
        return res
          .status(404)
          .json({
            message:
              "가입된 정보를 찾을 수 없습니다. 회원가입을 하시기 바랍니다.",
          });
    }
  );
});

export default route;
