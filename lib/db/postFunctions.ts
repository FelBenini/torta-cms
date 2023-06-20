import { ObjectId } from "mongoose";
import { postController } from "../mongodb/controllers/postController";

export class PostFunctions {
  public static getAllPosts = async (page: number) => {
    return await postController.getAllPosts(page)
  }

  public static getPublishedPosts = async (page: number = 1, limit: number = 1) => {
    return await postController.getPublishedPosts(page, limit);
  }

  public static getOnePostById = async (id: string) => {
    return await postController.getOnePostById(id);
  }
}