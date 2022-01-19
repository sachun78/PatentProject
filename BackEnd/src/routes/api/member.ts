import express from "express";
import * as memberCtrl from "controller/member";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("member");
  }
);

route.post("/signup", memberCtrl.joinMemberUser);
route.post("/signin", memberCtrl.loginMemberUser);
route.post("/likeuserfind", memberCtrl.registerLikeUser);
route.post("/likepostfind", memberCtrl.registerLikePost);
route.post("/findname", memberCtrl.findMemberUserName);

export default route;
