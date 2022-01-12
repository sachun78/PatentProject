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
          return res.status(200).json({ message: "mynetwork find", data : resuser })
        }
        else {
          return res.status(409).json({ message: "mynetwork not found" });
        }
      }
    );
  });

  route.post("/mynetworkup", (req, res) => {
    const user = mongoose.model("mynetwork", MyNetworkSchema);
    const new_user = new user(req.body);
    new_user.save((err: any) => {
      if (err) {
        return res.status(500).json({ message: "mynetwork new save error" });
      } else {
        return res.status(200).json({ message: "mynetwork new save success" });
      }
    });
  });

  route.post("/mynetworkupdatefind", (req, res) => {
    const user = mongoose.model("mynetwork", MyNetworkSchema);
    user.findOneAndUpdate(
      { $and: [{email: req.body.email}, {"meetpeople":{"$elemMatch":{"email": req.body.meet_email}}} ]}, {$inc:{"meetpeople.$.meetcount": 1}}, {new: true}, 
      (err: any, resuser: any) => {
        if (err) return res.status(500).json({ message: "error!!" });
        else if (resuser){
          console.log(resuser)
          return (
            res.status(200).json({ message: "mynetwork find and increase meetcount", data: resuser})
          )
        }
        else {
          return res.status(409).json({ message: "mynetwork not found" })
        }
      }
    );
  });

  route.post("/mynetworkupdatepeople", (req, res) => {
    const user = mongoose.model("mynetwork", MyNetworkSchema);
      user.findOneAndUpdate(
        {email: req.body.email}, {$push:{"meetpeople": req.body.meetpeople}},
        (err: any, resuser: any) => {
          if (err) return res.status(500).json({ message: "error!!" });
          else if (resuser){
            return res.status(200).json({ message: "mynetwork push"})
          }
          else {
            return (res.status(409).json({ message: "mynetwork push error" })
            )
          }
        }
      );
  });

  export default route;
