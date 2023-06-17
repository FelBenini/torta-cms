import mongoose, { model } from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {type: String, required: true}
})

const Category = mongoose.models.Category ||  model('Category', CategorySchema);

export default Category