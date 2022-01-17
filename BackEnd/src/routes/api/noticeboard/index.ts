import express from "express";
import mongoose from "mongoose";
import { NoticeSchema } from "schema/schema";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("noticeboard");
  }
);

route.post("/noticeboardadd", (req, res) => {
  const notice = mongoose.model("noticeboard", NoticeSchema);
  const new_notice = new notice(req.body);
  new_notice.save((err: mongoose.CallbackError) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({ message: "저장 성공", data: new_notice });
    }
  });
});

export default route;
