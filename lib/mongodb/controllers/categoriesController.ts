import Category from "../models/Category"
import dbConnect from ".."
import { ObjectId } from "mongoose"
export default class categoriesController {
  public static getCategories = async () => {
    const categories = await Category.find().exec()
    return categories
  }

  public static addCategory = async (name: string, type: string = 'father', fatherCategory?: string | ObjectId) => {
    await dbConnect()
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
    categoryToUpdate.childCategories.push()
    await newCategory.save()
    await categoryToUpdate.save()
    return newCategory
  }
}