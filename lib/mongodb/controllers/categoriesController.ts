import Category from "../models/Category"
import dbConnect from ".."
import { ObjectId } from "mongoose"
import PublishedPosts from "../models/PublishedPosts"
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

  public static findPublishedPostsByCategory = async (categoryName: string | null, page: number, limit: number, order: string  = '-publishedAt') => {
    await dbConnect();

    const category = await Category.findOne({name: categoryName});

    if (!category) {
      return null
    }

    const posts = await PublishedPosts.find({categories: category._id})
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(order)
    .populate('categories', '-_id -type -__v -childCategories')
    .lean();

    const count = await PublishedPosts.find({categories: category._id}).count().exec();
    const numOfPages = Math.ceil(count / 15)

    return {
      number_of_pages: numOfPages,
      number_of_posts: count,
      posts: posts
    }
  }
}