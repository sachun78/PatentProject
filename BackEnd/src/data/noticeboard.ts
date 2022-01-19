import mongoose from "mongoose";
import { NoticeSchema } from "schema/schema";

const noticeboard = mongoose.model("noticeboards", NoticeSchema);

export function saveNoticeboard(bodyData: any) {
    const new_noticeboard = new noticeboard(bodyData);
    return new_noticeboard.save();
}

export function findNoticeboard(bodyData: any) {
    return noticeboard.find({email : bodyData});
}