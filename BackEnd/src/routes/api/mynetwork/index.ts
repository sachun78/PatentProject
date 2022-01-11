import express from "express";
import mongoose from "mongoose";
import { MyNetworkSchema } from "schema/schema";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("mynetwork");
  }
);

route.post("/mynetworkfind", (req, res) => {
    const user = mongoose.model("mynetwork", MyNetworkSchema);
    user.findOne(
      { email: req.body.email },
      (err: any, resuser: any) => {
        if (err) return res.status(500).json({ message: "error!!" });
        else if (resuser){
          return res.status(200).json({ message: "mynetwor find", data : resuser })
        }
        else {
          const new_user = new user(req.body);
          new_user.save((err: any) => {
            if (err) {
              return res.status(500).json({ message: "mynetwor save error" });
            } else {
              return res.status(200).json({ message: "mynetwor save success" });
            }
          });
        }
      }
    );
  });

  export default route;
