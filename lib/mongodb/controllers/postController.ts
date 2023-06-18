import dbConnect from "..";
import Post, {type PostType} from "../models/Post";
import User from "../models/User";

export class postController {
  public static createPost = async (username: string) => {
    await dbConnect();
    const userPosting = await User.findOne({username: username}).exec()
    const postDraft: PostType = {
      title: ' ',
      content: ' ',
      postedBy: userPosting._id,
      published: false,
    }
    const post = new Post(postDraft)
    await post.save()
    return post._id
  }
}