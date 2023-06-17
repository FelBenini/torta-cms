import dbConnect from "..";
import User from "../models/User"
import Post from "../models/Post";
import Category from "../models/Category";

export default class mongoController {
  public static getSizeOfDatabase = async () => {
    await dbConnect()
    const userCollection = await User.aggregate([{$collStats: {storageStats: {}}}]).exec()
    const sizeOfUserCollection = userCollection[0].storageStats.size;
    const postCollection = await Post.aggregate([{$collStats: {storageStats: {}}}]).exec()
    const sizeOfPostCollection = postCollection[0].storageStats.size;
    const categoryCollection = await Category.aggregate([{$collStats: {storageStats: {}}}]).exec()
    const sizeOfCategoryCollection = categoryCollection[0].storageStats.size;
    return {
      userCollection: sizeOfUserCollection,
      postCollection: sizeOfPostCollection,
      categoryCollection: sizeOfCategoryCollection
    }
  }
}