import mongoose from "mongoose";
import { MyNetworkSchema } from "schema/schema";

const mynetwork = mongoose.model("mynetworks", MyNetworkSchema);

export function saveMyNetwork(bodyData: any) {
    const new_mynetwork = new mynetwork(bodyData);
    return new_mynetwork.save();
}

export function saveMyNetworkUserAdd(bodyData: any, meetpeopleData: any) {
    return mynetwork.findOneAndUpdate({email: bodyData}, {$push:{"meetpeople": meetpeopleData}});
}

export function saveMyNetworkUserIncrease(bodyData: any, meetpeopleData: any) {
    return mynetwork.findOneAndUpdate({ $and: [{email: bodyData}, {"meetpeople":{"$elemMatch":{"email": meetpeopleData.email}}} ]}, {$inc:{"meetpeople.$.meetcount": 1}}, {new: true});
}

export function findMyNetwork(bodyData: any) {
    return mynetwork.findOne({email : bodyData});
}