import { postController } from "../mongodb/controllers/postController";

export class PostFunctions {
  public static getAllPosts = async (page: number) => {
    return postController.getAllPosts(page)
  }
}