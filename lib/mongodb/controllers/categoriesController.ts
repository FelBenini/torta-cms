import Category from "../models/Category"

export default class categoriesController {
  public static getCategories = async () => {
    const categories = await Category.find().exec()
    return categories
  }
}