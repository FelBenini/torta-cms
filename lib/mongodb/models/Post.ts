import mongoose, { model } from 'mongoose'

export type PostType = {
  title: string,
  createdAt?: Date,
  content: string,
  published: boolean,
  publishedAt?: Date,
  backgroundImage?: string,
  categories?: mongoose.Schema.Types.ObjectId[],
  tags?: string[],
  summary?: string,
  postedBy: mongoose.Schema.Types.ObjectId,
  updatedAt?: Date,
  publishedPost?: mongoose.Schema.Types.ObjectId
}

const PostSchema = new mongoose.Schema<PostType>({
  title: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now()},
  content: {type: String, required: true},
  published: {type: Boolean, required: true, default: false},
  publishedAt: {type: Date},
  backgroundImage: {type: String},
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  updatedAt: {type: Date},
  tags: {type: Array},
  summary: {type: String},
  postedBy: {type: String, required: true},
  publishedPost: {type: mongoose.Schema.Types.ObjectId, ref: 'PublishedPosts'}
})

const Post = mongoose.models.Post ||  model<PostType>('Post', PostSchema);

export default Post