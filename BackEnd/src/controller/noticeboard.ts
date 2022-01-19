import express from "express";
import * as dataCtrl from "data/noticeboard";

export function saveNoticeboard(req: express.Request, res: express.Response) {
    dataCtrl.saveNoticeboard(req.body)
        .then(() => { return res.status(200).json({ message: "게시글 업로드 성공" })} )
        .catch(() => { return res.status(500).json({ message: "게시글 업로드 실패" })} );
}

export function findNoticeboard(req: express.Request, res: express.Response) {
    const email = req.body.email;
    dataCtrl.findNoticeboard(email)
        .then((retData) => { return res.status(200).json({ message: "게시글 리스트 찾기 완료", data: retData }) })
        .catch((error) => { return res.status(404).json({ message: error.message }) });
}