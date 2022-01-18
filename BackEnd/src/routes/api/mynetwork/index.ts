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
    const user = mongoose.model("mynetworks", MyNetworkSchema);
    user.findOne(
      { email: req.body.email },
      (err: mongoose.CallbackError, resuser: any) => {
        if (err) return res.status(500).json({ message: err.message });
        else if (resuser){
          return res.status(200).json({ message: "mynetwork find", data : resuser })
        }
        else {
          return res.status(409).json({ message: "not found user" });
        }
      }
    );
  });

  route.post("/mynetworkfindnupdate", (req, res) => {
    const user = mongoose.model("mynetworks", MyNetworkSchema);
    user.findOne(
      { email: req.body.email },
      (err: mongoose.CallbackError, resuser: any) => {
        if (err) return res.status(500).json({ message: err.message });
        else if (resuser){
          for (const value of req.body.meetpeople) {
          user.findOneAndUpdate(
            { $and: [{email: req.body.email}, {"meetpeople":{"$elemMatch":{"email": value.email}}} ]}, {$inc:{"meetpeople.$.meetcount": 1}}, {new: true}, 
            (err: mongoose.CallbackError, resuser1: any) => {
              if (err) return res.status(500).json({ message: err.message });
              else if (resuser1){
                console.log(resuser1)
                return (
                  res.status(200).json({ message: "mynetwork find and increase meetcount", data: resuser1})
                )
              }
              else {
                user.findOneAndUpdate(
                  {email: req.body.email}, {$push:{"meetpeople": value}},
                  (err: mongoose.CallbackError, resuser2: any) => {
                    if (err) return res.status(500).json({ message: err.message });
                    else if (resuser2){
                      return res.status(200).json({ message: "mynetwork push"})
                    }
                    else {
                      return (res.status(409).json({ message: "mynetwork push error" })
                      )
                    }
                  }
                );
              }
            }
          );
          }
        }
        else {
          const new_user = new user(req.body);
          new_user.save((err: mongoose.CallbackError) => {
            if (err) {
              return res.status(500).json({ message: err.message });
            } else {
              return res.status(200).json({ message: "mynetwork new save success" });
            }
          });
        }
      }
    );
  });

  export default route;
