import { postController } from "../mongodb/controllers/postController";

export class PostFunctions {
  public static getAllPosts = async (page: number = 1) => {
    return postController.getAllPosts(page)
  }
}