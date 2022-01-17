import express from "express";
import mongoose, {Error} from "mongoose";
import { EventSchema } from "schema/schema";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("event");
  }
);

route.post("/eventup", (req, res) => {
  const event = mongoose.model("events", EventSchema);
  const new_event = new event(req.body);
  new_event.save((err: mongoose.CallbackError) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({ message: "저장 성공", data: new_event });
    }
  });
});

export default route;
