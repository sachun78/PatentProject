import mongoose from "mongoose";
import { UserSchema, UserLikeSchema } from "schema/schema";
import { useVirtualId } from 'database/database';

const member = mongoose.model("member", UserSchema);

useVirtualId(UserSchema);

export async function findByEmail(email: String) {
    return member.findOne({email});
}

export async function findById(id: any) {
    return member.findById(id);
}

export async function createUser(user: any) {
    return new member(user).save().then((data: any) => data.id);
}