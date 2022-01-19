import express from "express";
import * as noticeboardCtrl from "controller/noticeboard";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("noticeboard");
  }
);

route.post("/noticeboardup", noticeboardCtrl.saveNoticeboard);
route.post("/noticeboardfind", noticeboardCtrl.findNoticeboard);

export default route;
