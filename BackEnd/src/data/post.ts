import mongoose from 'mongoose'
import { useVirtualId } from 'database/database'

type PostType = {
  owner_id: string;
  owner_username: string;
  owner_thumb: string;
  contents: string;
  images: string[];
  like_cnt: number;
  comment: CommentType[];
}

type CommentType = {
  id: string;
  owner_id: string;
  owner_username: string;
  ower_thumb: string;
  contents: string;
  createdAt: Date;
}

const postSchema = new mongoose.Schema<PostType>({
  owner_id: { type: String, required: true },
  owner_username: { type: String, required: true },
  owner_thumb: { type: String, default: '' },
  contents: { type: String, required: true },
  images: { type: [String], default: [] },
  like_cnt: { type: Number, default: 0},
  comment: {
    type: [{
      id: { type: String, required: true},
      owner_id: { type: String, required: true},
      owner_username: { type: String, required: true },
      owner_thumb: { type: String, default: ''},
      contents: { type: String, required: true},
      createdAt: { type: Date, required: true}
    }], default: []
  }
}, 
{
  timestamps: true,
  versionKey: false
})
useVirtualId(postSchema);

const Post = mongoose.model('post', postSchema);

export async function findById(postId: string): Promise<PostType | null> {
  return Post.findById(postId);
}

export async function getPostAll(): Promise<PostType[] | null> {
  return Post.find().sort({createdAt: -1});
}

export async function getPostIndex(curPos: number, count: number): Promise<PostType[] | null> {
  return Post.find().skip(curPos).limit(count);
}

export async function createPost(postData: PostType): Promise<PostType> {
  return new Post(postData).save();
}

export async function editPost(postId: string, editData: any): Promise<PostType | null> {
  return Post.findByIdAndUpdate(postId, editData, { new: true});
}

export async function deletePost(postId: string) {
  return Post.findByIdAndDelete(postId);
}
