import dbConnect from ".."
import Post from "../models/Post";

export class pageController {
  public static getAllPages = async (page: number = 1) => {
    await dbConnect();
    const pages = await Post.find({ type: 'page' })
      .limit(15)
      .skip((page - 1) * 15)
      .sort('-createdAt')
      .exec()

    const count = await Post.find({ type: 'page' }).count()
    return {
      numOfPosts: count,
      posts: pages
    }
  }

  public static getOnePageById = async (id: string) => {
    await dbConnect();
    const page = await Post.findOne({_id: id, type: 'page'}).exec();
    if (page) {
      return page;
    }
    return null
  }
}