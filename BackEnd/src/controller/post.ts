import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';
import * as postRepo from "data/post";
import * as userRepo from 'data/auth';
import multer from 'multer';

interface IRequest extends Request {
  [key: string]: any
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, files, cb) => {
    cb(null, `${Date.now()}_${files.originalname}`)
  }
})

const upload = multer({
  storage: storage
}).array('post_img', 2);

export function postImgUpload(req: IRequest, res: Response, next: NextFunction) {
  upload(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.status(409).json({ success: false, error: `${err.code}`})
    }
    
    const files = req.files as Express.Multer.File[];
    if (!files) {
      return res.status(409).json("files are not found");
    }

    res.json({success: true, files: req.files});
  })
}

export async function getPosts(req: IRequest, res: Response) {
  try {
    const curPos = req.query.curPos as string;
    const cnt = req.query.cnt as string;
    const postId = req.params.id;

    if (curPos && cnt) {
      let _curPos: number = parseInt(curPos);
      let _cnt: number = parseInt(cnt);

      const indexData = await postRepo.getPostIndex(_curPos, _cnt);
      console.log(indexData);
      return res.status(200).json(indexData);
    }

    const posts = await (postId ? postRepo.findById(postId) : postRepo.getPostAll());
    res.status(200).json(posts);
  }
  catch(e) {
    console.error(`[Post][getPosts] ${e}`);
    throw new Error(`[Post][getPosts] ${e}`);
  }
}

export async function createPost(req: IRequest, res: Response) {
  try {
    const postData = req.body;
    const userData = await userRepo.findById(req.userId);
    if (userData) {
      postData['owner_id'] = userData.id;
      postData['owner_username'] = userData.username;
      postData['owner_thumb'] = userData.photo_path;
    }
    else {
      return res.status(409).json({ message: 'user is not found'});
    }
    const post = await postRepo.createPost(postData);
    res.status(200).json(post);
  }
  catch(e) {
    console.error(`[Post][createPost] ${e}`);
    throw new Error(`[Post][createPost] ${e}`);
  }
}

export async function editPost(req: IRequest, res: Response) {
  try{
    const findPost = await postRepo.findById(req.params.id);
    if (findPost) {
      if (req.userId === findPost.owner_id) {
        const {like_cnt} = req.body;
        const likeList = [...findPost.like_cnt, like_cnt];
        req.body['like_cnt'] = likeList;

        const editPost = await postRepo.editPost(req.params.id, req.body);
        res.status(200).json({message: `contents: (${editPost?.contents}), images: (${editPost?.images})`});
      }
      else {
        return res.status(409).json({ message: 'owner is different'});
      }
    }
    else {
      return res.status(409).json({ message: 'post is not exist'});
    }
  }
  catch(e) {
    console.error(`[Post][editPost] ${e}`);
    throw new Error(`[Post][editPost] ${e}`);
  }
}

export async function deletePost(req: IRequest, res: Response) {
  try{
    const findPost = await postRepo.findById(req.params.id);
    if (findPost) {
      if (req.userId === findPost.owner_id) {
        const editPost = await postRepo.deletePost(req.params.id);
        res.status(200).json({message: 'delete success!!!'});
      }
      else {
        return res.status(403).send('[deletePost] forbidden');
      }
    }
    else {
      return res.status(409).json({ message: 'post is not exist'});
    }
  }
  catch(e) {
    console.error(`[Post][deletePost] ${e}`);
    throw new Error(`[Post][deletePost] ${e}`);
  }
}

export async function createComment(req: IRequest, res: Response) {
  const postId = req.params.id;
  const comment = req.body;
  try{
    const user = await userRepo.findById(req.userId);
    if (!user) {
      return res.status(409).json({ message: `user not found`});
    }

    comment['id'] = shortid.generate();
    comment['owner_id'] = user.id;
    comment['owner_username'] = user.username;
    comment['owner_thumb'] = user.photo_path;

    const findPost = await postRepo.findById(postId);
    if (!findPost) {
      return res.status(409).json({ message: `POST(${postId}) is not found`});
    }

    let postComment = [...findPost.comment, comment];
    postComment.sort(function(a, b) { 
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return a > b ? 1 : a < b ? -1 : 0
    });

    const update = await postRepo.editPost(postId, {comment: postComment});
    res.status(200).json(comment);
  }
  catch(e) {
    console.error(`[Post][createComment] ${e}`);
    throw new Error(`[Post][createComment] ${e}`);
  }
}

export async function editComment(req: IRequest, res: Response) {
  const postId: string = req.query.postId as string;
  const commentId: string = req.query.commentId as string;
  const bodyData = req.body;

  try {
    const post = await postRepo.findById(postId);
    if (!post) {
      return res.status(409).json({ message: 'post is not found'});
    }
    else {
      const comments = post.comment;
      const result = comments.find(comment => comment.id === commentId);
      console.log('pre', result);
      if (result) {
        result.contents = bodyData.contents; 
        result.createdAt = bodyData.createdAt;
      }
      const oricomment = comments.filter(comment => comment.id !== commentId);
      let postComment = [...oricomment, result];
      postComment.sort(function(a: any, b: any) { 
        a = new Date(a.createdAt);
        b = new Date(b.createdAt);
        return a > b ? 1 : a < b ? -1 : 0
      });

      console.log('after', postComment);
      const update = await postRepo.editPost(postId, {comment: postComment});
      res.status(200).json(update);
    }
  }
  catch(e) {
    console.error(`[Post][editComment] ${e}`);
    throw new Error(`[Post][editComment] ${e}`);
  }
}

export async function deleteComment(req: IRequest, res: Response) {
  const postId: string = req.query.postId as string;
  const commentId: string = req.query.commentId as string;

  try {
    const post = await postRepo.findById(postId);
    if (!post) {
      return res.status(409).json({ message: 'post is not found'});
    }
    else {
      const comments = post.comment;
      const result = comments.filter(comment => comment.id !== commentId);
      const update = await postRepo.editPost(postId, {comment: result});
      res.status(200).json(update);
    }
  }
  catch(e) {
    console.error(`[Post][deleteComment] ${e}`);
    throw new Error(`[Post][deleteComment] ${e}`);
  }
}