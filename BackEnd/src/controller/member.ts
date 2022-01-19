import express from "express";
import * as dataCtrl from "data/member";

const bcrypt = require("bcrypt");

export function loginMemberUser(req: express.Request, res: express.Response) {
    const email = req.body.email;
    dataCtrl.findMemberOneUser(email)
        .then((retData) => {
            if(bcrypt.compareSync(req.body.password, retData.password) === true){
                return res.status(200).json({ message: "환영합니다." , data: retData.name});
              } else {
                return res.status(409).json({ message: "비밀번호 오류" });
              }
    })
        .catch((error) => { return res.status(500).json({ message: "가입된 정보를 찾을 수 없습니다. 회원가입을 하시기 바랍니다." }) });
}

export function joinMemberUser(req: express.Request, res: express.Response) {
    const email = req.body.email;
    dataCtrl.findMemberOneUser(email)
        .then((retData) => { return res.status(200).json({ message: "이미 가입된 사용자 입니다." }) })
        .catch((error) => {
            dataCtrl.saveMemberUser(req.body)
            .then((retData:any) => { return res.status(200).json({ message: "사용자 저장 완료", data: retData }) })
            .catch((error:any) => { return res.status(404).json({ message: error.message }) });
        });
}

export function registerLikeUser(req: express.Request, res: express.Response) {
    const email = req.body.email;
    dataCtrl.findLikeUser(email)
        .then((retData) => {
            dataCtrl.findLikeUserFriend(req.body)
            .then((retData:any) => { return res.status(200).json({ message: "like user already add!" }) })
            .catch((error:any) => { 
                dataCtrl.saveLikeUserFriend(req.body)
                .then((retData:any) => { return res.status(200).json({ message: "like user add success!" }) })
                .catch((error:any) => { return res.status(404).json({ message: error.message }) });
            });
    })
        .catch((error) => { 
            dataCtrl.saveLikeUser(req.body)
            .then((retData:any) => { return res.status(200).json({ message: "like user create success!" }) })
            .catch((error:any) => { return res.status(404).json({ message: error.message }) });
        });
}

export function registerLikePost(req: express.Request, res: express.Response) {
    const email = req.body.email;
    dataCtrl.findLikePost(email)
        .then((retData) => {
            dataCtrl.findLikePostGood(req.body)
            .then((retData:any) => { return res.status(200).json({ message: "like post already add!" }) })
            .catch((error:any) => { 
                dataCtrl.saveLikePostGood(req.body)
                .then((retData:any) => { return res.status(200).json({ message: "like post add success!" }) })
                .catch((error:any) => { return res.status(404).json({ message: error.message }) });
            });
    })
        .catch((error) => { 
            dataCtrl.saveLikePost(req.body)
            .then((retData:any) => { return res.status(200).json({ message: "like post create success!" }) })
            .catch((error:any) => { return res.status(404).json({ message: error.message }) });
        });
}

export function findMemberUserName(req: express.Request, res: express.Response) {
    const name = req.body.name;
    dataCtrl.findMemberlikeUserName(name)
        .then((retData) => { return res.status(200).json({ message: "find user!", data: retData }) })
        .catch((error) => { return res.status(500).json({ message: "not found user" }) });
}
