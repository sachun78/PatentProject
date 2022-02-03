import mongoose from "mongoose";

export interface IEvent {
    user_id: string,
    name: string,
    start_date: Date,
    end_date: Date,
}

export const eventSchema = new mongoose.Schema<IEvent>({
    user_id: {type: String},
    name: {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
}, {timestamps: true});


const Event = mongoose.model("Event", eventSchema);

export function saveEvent(bodyData: any) {
    const new_event = new Event(bodyData);
    return new_event.save();
}

export function findEvent(bodyData: any) {
    return Event.find({email : bodyData});
}
