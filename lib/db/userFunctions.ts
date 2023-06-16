import { mongooseUserController } from "../mongodb/controllers/userController";

export class UserFunctions {
  public static getUserByName = async (username: string | undefined) => {
    return await mongooseUserController.getUserByName(username as string)
  }
}