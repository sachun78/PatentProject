import express from "express";
import { authChecker } from "../../middleware/authChecker";
import { makeJWTkey } from "../../middleware/authSign";
import * as memberCtrl from "controller/member";
import { sendAuthMail } from "middleware/authSendMail";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("member");
  }
);

route.post("/signup", memberCtrl.joinMemberUser, makeJWTkey);
route.post("/signin", memberCtrl.loginMemberUser, makeJWTkey);
route.post("/likeuserfind", authChecker, memberCtrl.registerLikeUser);
route.post("/likepostfind", authChecker, memberCtrl.registerLikePost);
route.post("/findname", authChecker, memberCtrl.findMemberUserName);
route.post("/sendAuthEmail", sendAuthMail);

route.post("/updateCompany", authChecker, memberCtrl.updateMemberCompany);
route.post("/updateDepartment", authChecker, memberCtrl.updateMemberDepartment);
route.post("/updatePosition", authChecker, memberCtrl.updateMemberPosition);
route.post("/updatePrevhistory", authChecker, memberCtrl.updateMemberPrevhistory);
route.post("/updateField", authChecker, memberCtrl.updateMemberField);

export default route;
