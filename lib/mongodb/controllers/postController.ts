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
      postedBy: userPosting.username,
      published: false,
    }
    const post = new Post(postDraft)
    await post.save()
    return post._id
  }

  public static getAllPosts = async (page: number) => {
    await dbConnect();
    const posts = await Post.find()
    .limit(15)
    .skip((page - 1) * 15)
    .populate('postedBy', '-_id -password -email -__v -apiKey')
    .sort('-createdAt')
    .exec()

    const count = await Post.find().count()
    return {
      numOfPosts: count,
      posts: posts
    }
  }

  public static getPublishedPosts = async (page: number, limit: number) => {
    await dbConnect();
    const posts = await Post.find({published: true}, '-__v, -createdAt -content')
    .limit(limit)
    .skip((page - 1) * limit)
    .populate('postedBy', '-_id -password -email -__v -apiKey')
    .sort('-publishedAt')
    .exec();

    const count = await Post.find({published: true}).count().exec();
    const numOfPages = Math.ceil(count / 15)
    return {
      number_of_pages: numOfPages,
      number_of_posts: count,
      posts: posts
    }
  }

  public static getOnePostById = async (id: string) => {
    await dbConnect();
    const post = await Post.findById(id).exec();
    if (post) {
      return post;
    }
    return null
  }
}