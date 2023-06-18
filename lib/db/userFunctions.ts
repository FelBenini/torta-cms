import { mongooseUserController } from "../mongodb/controllers/userController";
import { type UserType } from "../mongodb/models/User";

export class UserFunctions {
  public static getUserByName = async (username: string | undefined) => {
    return await mongooseUserController.getUserByName(username as string)
  }

  public static checkFirstUser = async () => {
    return await mongooseUserController.checkIfFirstUser()
  }

  public static createFirstUser = async (user: UserType) => {
    return await mongooseUserController.createFirstUser(user)
  }
}