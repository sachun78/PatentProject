import express from "express";
import mongoose from "mongoose";
import { MeetingSchema } from "schema/schema";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("member");
  }
);

route.post("/meetingup", (req, res) => {
  const meeting = mongoose.model("meeting", MeetingSchema);
  const new_meeting = new meeting(req.body);
  new_meeting.save((err: any) => {
    if (err) {
      return res.status(500).json({ message: "게시글 업로드 실패" });
    } else {
      return res.status(200).json({ message: "게시글 업로드 성공" });
    }
  });
});

route.post("/meetingfind", (req, res) => {
  const meeting = mongoose.model("meeting", MeetingSchema);
  meeting.findOne({ email: req.body.email }, (err: any, meeting: any) => {
    if (err) return res.status(500).json({ message: "error!!" });
    else if (meeting)
      return res
        .status(200)
        .json({ message: "게시글 리스트 찾기 완료", data: meeting });
    else
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
  });
});

export default route;
