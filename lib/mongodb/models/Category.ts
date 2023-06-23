import mongoose, { model } from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  childCategories: [{type: mongoose.Schema.Types.ObjectId}],
  mainCategory: {type: mongoose.Schema.Types.ObjectId}
})

const Category = mongoose.models.Category ||  model('Category', CategorySchema);

export default Category