import express from "express";
import * as mynetworkCtrl from "controller/mynetwork";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("mynetwork");
  }
);

route.post("/mynetworkfind", mynetworkCtrl.findMyNetwork);
route.post("/mynetworkfindnupdate", mynetworkCtrl.findMyNetworkUserAdd);

  export default route;
