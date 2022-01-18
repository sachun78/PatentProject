import mongoose from "mongoose";
import { PostSchema } from "schema/schema";

const post = mongoose.model("posts", PostSchema);

export function saveData(bodyData: any) {
    const new_post = new post(bodyData);
    return new_post.save();
}

export function findData(bodyData: any) {
    return post.find({email : bodyData});
}