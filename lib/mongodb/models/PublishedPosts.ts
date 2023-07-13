import mongoose, { model } from 'mongoose'
import { IPost } from './Post';

export interface IPublishedPost extends IPost {
  draftPost: IPost | string | mongoose.ObjectId
}

export interface IPublishedPostDocument extends IPublishedPost, mongoose.Document { }
export interface IPublishedPostModel extends mongoose.Model<IPublishedPostDocument> {
    buildUser(args: IPublishedPost): IPublishedPostDocument
}

const PublishedPostsSchema: mongoose.Schema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  publishedAt: {type: Date, required: true, default: Date.now()},
  backgroundImage: {type: String},
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  updatedAt: {type: Date},
  tags: {type: Array},
  summary: {type: String},
  postedBy: {type: String, required: true},
  draftPost: {type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true}
})

const PublishedPosts = mongoose.models.PublishedPosts<IPublishedPost> ||  model<IPublishedPostDocument, IPublishedPostModel>('PublishedPosts', PublishedPostsSchema);

export default PublishedPosts