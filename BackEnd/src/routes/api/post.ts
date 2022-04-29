import express from "express";
import * as postCtrl from "controller/post";
import { isAuth } from 'middleware/authChecker';

const route = express.Router();

route.get('/', isAuth, postCtrl.getPosts);
route.get('/:id', isAuth, postCtrl.getPosts);
route.post('/comment/:id', isAuth, postCtrl.createComment);
route.post('/upload/', isAuth, postCtrl.postImgUpload);
route.post('/', isAuth, postCtrl.createPost);
route.patch('/post/:id', isAuth, postCtrl.editPost);
route.patch('/like/', isAuth, postCtrl.updateLike);
route.patch('/comment/', isAuth, postCtrl.editComment);
route.delete('/post/:id', isAuth, postCtrl.deletePost);
route.delete('/comment/', isAuth, postCtrl.deleteComment);

export default route;
