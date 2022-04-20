import { Request, Response, NextFunction } from 'express';
import * as postRepo from "data/post";
import * as userRepo from 'data/auth';

interface IRequest extends Request {
  [key: string]: any
}

export async function createPost(req: IRequest, res: Response) {
  try {
    const postData = req.body;
    const userData = await userRepo.findById(req.userId);
    if (userData) {
      postData['owner_id'] = userData.id;
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
    const findPost = await postRepo.findByPostID(req.params.id);
    if (findPost) {
      if (req.userId === findPost.owner_id) {
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
    const findPost = await postRepo.findByPostID(req.params.id);
    if (findPost) {
      if (req.userId === findPost.owner_id) {
        const editPost = await postRepo.deletePost(req.params.id);
        res.status(200).json({message: 'delete success!!!'});
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
    console.error(`[Post][deletePost] ${e}`);
    throw new Error(`[Post][deletePost] ${e}`);
  }
}