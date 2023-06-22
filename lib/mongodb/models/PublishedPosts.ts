import mongoose, { model } from 'mongoose'

const PostSchema = new mongoose.Schema({
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
  draftPost: {type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true}
})

const Post = mongoose.models.Post ||  model('Published', PostSchema);

export default Post