import mongoose from "mongoose";
import { UserSchema, UserLikeSchema } from "schema/schema";

const user = mongoose.model("members", UserSchema);
const userlike = mongoose.model("likeusers", UserLikeSchema);
const postlike = mongoose.model("likeposts", UserLikeSchema);

export function findMemberOneUser(bodyData: any) {
    return user.findOne({email : bodyData});
}

export function saveMemberUser(bodyData: any) {
    const new_user = new user({
        name: bodyData.name,
        email: bodyData.email,
        password: bodyData.password,
        company: bodyData.company,
        department: bodyData.department,
        position: bodyData.position,
        field: bodyData.field,
        photopath: bodyData.photopath,
        status: bodyData.status,
        prevhistory: bodyData.prevhistory,
        country: bodyData.country,
        date: new Date()
      });

    return new_user.save();
}

export function findLikeUser(bodyData: any) {
    return userlike.findOne({email : bodyData});
}

export function saveLikeUser(bodyData: any) {
    const new_userlike = new userlike(bodyData);
    return new_userlike.save();
}

export function findLikeUserFriend(bodyData: any) {
    return userlike.findOne({ $and: [{email: bodyData.email}, {"likes":{"$elemMatch":{"email": bodyData.likes[0].email}}} ]});
}

export function saveLikeUserFriend(bodyData: any) {
    return userlike.findOneAndUpdate({email: bodyData.email}, {$push:{"likes": bodyData.likes[0]}}, {new: true});
}

export function findLikePost(bodyData: any) {
    return postlike.findOne({email : bodyData});
}

export function saveLikePost(bodyData: any) {
    const new_postlike = new postlike(bodyData);
    return new_postlike.save();
}

export function findLikePostGood(bodyData: any) {
    return postlike.findOne({ $and: [{email: bodyData.email}, {"likes":{"$elemMatch":{"id": bodyData.likes[0].id}}} ]});
}

export function saveLikePostGood(bodyData: any) {
    return postlike.findOneAndUpdate({email: bodyData.email}, {$push:{"likes": bodyData.likes[0]}}, {new: true});
}

export function findMemberlikeUserName(bodyData: any) {
    return user.find({email : {$regex: '.*' + bodyData.name + '.*'}});
}

export function updateUserCompany(bodyData: any) {
    return user.findOneAndUpdate({email: bodyData.email}, {$set:{"company": bodyData.company}}, {new: true});
}

export function updateUserDepartment(bodyData: any) {
    return user.findOneAndUpdate({email: bodyData.email}, {$set:{"department": bodyData.department}}, {new: true});
}

export function updateUserPosition(bodyData: any) {
    return user.findOneAndUpdate({email: bodyData.email}, {$set:{"position": bodyData.position}}, {new: true});
}

export function updateUserPrevhistory(bodyData: any) {
    return user.findOneAndUpdate({email: bodyData.email}, {$set:{"prevhistory": bodyData.prevhistory}}, {new: true});
}

export function updateUserField(bodyData: any) {
    return user.findOneAndUpdate({email: bodyData.email}, {$set:{"field": bodyData.field}}, {new: true});
}
