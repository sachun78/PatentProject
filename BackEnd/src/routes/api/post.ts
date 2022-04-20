import express from "express";
import * as postCtrl from "controller/post";
import { isAuth } from 'middleware/authChecker';

const route = express.Router();

route.get('/', postCtrl.getPosts);
route.post('/', isAuth, postCtrl.createPost);
route.patch('/:id', isAuth, postCtrl.editPost);
route.delete('/:id', isAuth, postCtrl.deletePost)

export default route;
