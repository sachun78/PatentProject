import express from "express";
import * as eventCtrl from "controller/event";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("event");
  }
);

route.post("/eventup", eventCtrl.saveEvent);
route.post("/eventfind", eventCtrl.findEvent);

export default route;
