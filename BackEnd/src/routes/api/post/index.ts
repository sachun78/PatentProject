import express from "express";
import mongoose from "mongoose";
import { PostSchema } from "schema/schema";

const route = express.Router();

route.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("post");
  }
);

route.post("/postup", (req, res) => {
  const post = mongoose.model("posts", PostSchema);
  const new_post = new post(req.body);
  new_post.save((err: mongoose.CallbackError) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({ message: "게시글 업로드 성공" });
    }
  });
});

route.post("/postfind", (req, res) => {
  const post = mongoose.model("posts", PostSchema);
  post.find({ email: req.body.email }, (err: mongoose.CallbackError, post: any) => {
    if (err) return res.status(500).json({ message: err.message });
    else if (post)
      return res
        .status(200)
        .json({ message: "게시글 리스트 찾기 완료", data: post });
    else
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
  });
});

export default route;
