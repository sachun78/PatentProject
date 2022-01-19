import express from "express";
import * as dataCtrl from "data/mynetwork";

export function findMyNetworkUserAdd(req: express.Request, res: express.Response) {
    console.log(req.body.meetpeople[0])
    dataCtrl.findMyNetwork(req.body.email)
        .then(() => {
            dataCtrl.findMyNetworkUser(req.body.email, req.body.meetpeople[0])
            .then((retData) => { 
                if(retData !== null){
                dataCtrl.saveMyNetworkUserIncrease(req.body.email, req.body.meetpeople[0])
                .then(() => { return res.status(200).json({ message: "mynetwork find and increase meetcount" }) })
                .catch(() => { return res.status(500).json({ message: "mynetwork increase meetcount error" }) });
                } else{
                    dataCtrl.saveMyNetworkUserAdd(req.body.email, req.body.meetpeople[0])
                    .then(() => { return res.status(200).json({ message: "mynetwork push" })} )
                    .catch(() => { return res.status(500).json({ message: "mynetwork push error" })} );
                }
            })
            .catch(() => {});
        })
        .catch(() => {
            dataCtrl.saveMyNetwork(req.body)
            .then(() => { return res.status(200).json({ message: "mynetwork new save success" })} )
            .catch(() => { return res.status(500).json({ message: "mynetwork new save error" })} );
        });
}

export function findMyNetwork(req: express.Request, res: express.Response) {
    const email = req.body.email;
    dataCtrl.findMyNetwork(email)
        .then((retData) => { 
            return res.status(200).json({ message: "mynetwork find", data: retData }) })
        .catch((error) => { return res.status(404).json({ message: error.message }) });
}