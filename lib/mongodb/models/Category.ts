import mongoose, { model, Document } from 'mongoose'

export interface ICategory {
  name: string,
  type: string,
  childCategories?: Array<mongoose.ObjectId> | Array<ICategory>,
  mainCategory?: mongoose.ObjectId | ICategory
}

export interface ICategoryDocument extends ICategory, Document { }
export interface ICategoryModel extends mongoose.Model<ICategoryDocument> {
    buildUser(args: ICategory): ICategoryDocument
}

const CategorySchema: mongoose.Schema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  childCategories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  mainCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
})

const Category = mongoose.models.Category<ICategory> ||  model<ICategoryDocument, ICategoryModel>('Category', CategorySchema);

export default Category