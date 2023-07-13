import mongoose, { model } from 'mongoose'

export interface IPost {
  title: string,
  createdAt?: Date,
  content: string,
  published?: boolean,
  publishedAt?: Date,
  backgroundImage?: string,
  categories?: mongoose.Schema.Types.ObjectId[],
  tags?: string[],
  summary?: string,
  postedBy: mongoose.Schema.Types.ObjectId,
  updatedAt?: Date,
  publishedPost?: mongoose.Schema.Types.ObjectId,
  type?: string
}

export interface IPostDocument extends IPost, mongoose.Document { }
export interface IPostModel extends mongoose.Model<IPostDocument> {
    buildUser(args: IPost): IPostDocument
}


const PostSchema: mongoose.Schema = new mongoose.Schema({
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
  publishedPost: {type: mongoose.Schema.Types.ObjectId, ref: 'PublishedPosts'},
  type: {type: String, default: 'post'}
})

const Post = mongoose.models.Post<IPost> ||  model<IPostDocument, IPostModel>('Post', PostSchema);

export default Post
export type PostType = IPost;