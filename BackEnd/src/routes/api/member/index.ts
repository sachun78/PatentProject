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
  const user = mongoose.model("users", UserSchema);
  const new_user = new user(req.body);
  new_user.save((err: any) => {
    if (err) {
      return res.status(500).json({ message: "저장 실패" });
    } else {
      return res.status(200).json({ message: "저장 성공", data: new_user });
    }
  });
});

export default route;
