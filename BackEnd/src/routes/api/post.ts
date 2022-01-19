import express from "express";
import * as postCtrl from "controller/post";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("post");
  }
);

route.post("/postup", postCtrl.saveData);
route.post("/postfind", postCtrl.findData);

export default route;
