import dbConnect from "..";
import User from "../models/User"

export default class mongoController {
  public static getSizeOfDatabase = async () => {
    await dbConnect()
    const userCollection = await User.aggregate([{$collStats: {storageStats: {}}}]).exec()
    const sizeOfUserCollection = userCollection[0].storageStats.size;
    return {
      userCollection: sizeOfUserCollection
    }
  }
}