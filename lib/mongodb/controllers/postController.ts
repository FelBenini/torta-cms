import dbConnect from "..";
import Post, {type PostType} from "../models/Post";
import User from "../models/User";

export class postController {
  public static createPost = async (username: string) => {
    await dbConnect();
    const userPosting = await User.findOne({username: username}).exec()
    const postDraft: PostType = {
      title: 'Your title here',
      content: '<p>Write your content here</p>',
      postedBy: userPosting._id,
      published: false,
    }
    const post = new Post(postDraft)
    await post.save()
    return post._id
  }

  public static getAllPosts = async (page: number = 1) => {
    await dbConnect();
    const posts = await Post.find()
    .skip((page - 1) * 15)
    .limit(15)
    .populate('postedBy', '-_id -password -email -__v')
    .sort('-createdAt')
    .exec()

    const count = await Post.find().count()
    return {
      numOfPosts: count,
      posts: posts
    }
  }
}