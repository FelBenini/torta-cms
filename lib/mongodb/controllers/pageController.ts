import dbConnect from ".."
import Post from "../models/Post";

export class pageController {
  public static getAllPages = async (page: number = 1) => {
    await dbConnect();
    const posts = await Post.find({ type: 'page' })
      .limit(15)
      .skip((page - 1) * 15)
      .sort('-createdAt')
      .lean()

    const count = await Post.find({ type: 'page' }).count()
    return {
      numOfPosts: count,
      posts: posts
    }
  }
}