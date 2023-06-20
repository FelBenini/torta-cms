import mongoose, { model } from 'mongoose'

const ImageSchema = new mongoose.Schema({
  title: {type: String, required: true},
  day: {type: Number, required: true},
  month: {type: Number, required: true},
  year: {type: Number, required: true},
  data: {type: Buffer, required: true},
  contentType: {type: String, required: true}
})

const Image = mongoose.models.Image ||  model('Image', ImageSchema);

export default Image;