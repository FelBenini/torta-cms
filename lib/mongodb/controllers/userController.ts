import dbConnect from "..";
import User from "../models/User";

export class mongooseUserController {
  public static getUserByName = async (username: string) => {
    await dbConnect()
    const user = await User.findOne({username: username}).exec()
    if (!user) {
      return null
    }
    return user
  }
}