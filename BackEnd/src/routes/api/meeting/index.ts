import express from "express";
import mongoose, {Error} from "mongoose";
import { MeetingSchema } from "schema/schema";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("meeting");
  }
);

route.post("/meetingup", (req, res) => {
  const meeting = mongoose.model("meetings", MeetingSchema);
  const new_meeting = new meeting(req.body);
  new_meeting.save((err: mongoose.CallbackError) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({ message: "meeting 저장 성공" });
    }
  });
});

route.post("/meetingfind", (req, res) => {
  const meeting = mongoose.model("meetings", MeetingSchema);
  meeting.find({ email: req.body.email }, (err: mongoose.CallbackError, meeting: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (meeting)
      return res
        .status(200)
        .json({ message: "meeting 리스트 찾기 완료", data: meeting });
    else
      return res.status(404).json({
        message: "meeting 내용을 찾을 수 없습니다.",
      });
  });
});

route.post("/meetingnetwork", (req, res) => {
  const meeting = mongoose.model("meetings", MeetingSchema);
  meeting.find({ $or:[{email: req.body.email}, {guests:{email: req.body.email}} ]}, (err: mongoose.CallbackError, meeting: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (meeting)
      return res
        .status(200)
        .json({ message: "meeting 리스트 찾기 완료", data: meeting });
    else
      return res.status(404).json({
        message: "meeting 내용을 찾을 수 없습니다.",
      });
  });
});

export default route;
