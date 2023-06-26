import Category from "../models/Category"
import dbConnect from ".."
import { ObjectId } from "mongoose"
export default class categoriesController {
  public static getCategories = async () => {
    await dbConnect()
    const categories = await Category.find({type: 'father'}).populate('childCategories').lean();
    return categories;
  }

  public static addCategory = async (name: string, type: string = 'father', fatherCategory?: string | ObjectId) => {
    await dbConnect()
    if (fatherCategory) {
      const father = await Category.findById(fatherCategory).exec()
      if (father.type !== 'father') {
        return null
      }
    }
    if (type === 'father') {
      const newCategory = await new Category({
        name: name,
        type: type
      })
      await newCategory.save()
      return newCategory
    }
    const newCategory = await new Category({
      name: name,
      type: type,
      mainCategory: fatherCategory,
    })
    const categoryToUpdate = await Category.findById(fatherCategory)
    categoryToUpdate.childCategories.push(newCategory._id)
    await newCategory.save()
    await categoryToUpdate.save()
    return newCategory
  }
}