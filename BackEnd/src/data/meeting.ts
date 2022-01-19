import mongoose from "mongoose";
import { MeetingSchema } from "schema/schema";

const meeting = mongoose.model("meetings", MeetingSchema);

export function saveMeeting(bodyData: any) {
    const new_meeting = new meeting(bodyData);
    return new_meeting.save();
}

export function findMeetingMySchedule(bodyData: any) {
    return meeting.find({email : bodyData});
}

export function findMeetingUserAll(bodyData: any) {
    return meeting.find({ $or:[{email: bodyData.email}, {guests:{email: bodyData.email}} ]});
}