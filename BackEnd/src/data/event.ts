import mongoose from "mongoose";
import { EventSchema } from "schema/schema";

const event = mongoose.model("events", EventSchema);

export function saveEvent(bodyData: any) {
    const new_event = new event(bodyData);
    return new_event.save();
}

export function findEvent(bodyData: any) {
    return event.find({email : bodyData});
}