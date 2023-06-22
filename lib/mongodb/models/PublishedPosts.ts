import mongoose, { model } from 'mongoose'

const PublishedPostsSchema = new mongoose.Schema({
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

const PublishedPosts = mongoose.models.PublishedPosts ||  model('PublishedPosts', PublishedPostsSchema);

export default PublishedPosts