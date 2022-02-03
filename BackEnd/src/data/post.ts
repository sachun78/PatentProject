import mongoose from 'mongoose'

interface IPost {
  user_id: string
  text: string
  comment: IComment[]
}

interface IComment {
  user_id: string
  text: string
  created_at: Date
  updated_at: Date
}

export const postSchema = new mongoose.Schema<IPost>({
  user_id: { type: String, required: true },
  text: { type: String, required: true },
  comment: {
    type:
      [{
        user_id: String,
        text: String,
        created_at: Date,
        updated_at: Date
      }]
  }
})


const Post = mongoose.model('posts', postSchema)

export function createPost(post: IPost) {
  const new_post = new Post(post)
  return new_post.save()
}
