import express from "express";
import * as dataCtrl from "data/event";

export function saveEvent(req: express.Request, res: express.Response) {
    dataCtrl.saveEvent(req.body)
        .then(() => { return res.status(200).json({ message: "event save success" })} )
        .catch(() => { return res.status(500).json({ message: "event save error" })} );
}

export function findEvent(req: express.Request, res: express.Response) {
    const email = req.body.email;
    dataCtrl.findEvent(email)
        .then((retData) => { return res.status(200).json({ message: "find event lists", data: retData }) })
        .catch((error) => { return res.status(404).json({ message: error.message }) });
}