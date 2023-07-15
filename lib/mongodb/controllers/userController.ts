import dbConnect from "..";
import Post from "../models/Post";
import Category from "../models/Category";
import User, { type UserType } from "../models/User";
import bcrypt from 'bcryptjs'

function generateApiKey(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export class userController {
  public static getUserByName = async (username: string) => {
    await dbConnect()
    const user = await User.findOne({username: {$regex: new RegExp(username, 'i')}}).exec()
    if (!user) {
      return null
    }
    return user
  }

  public static createFirstUser = async (newUser: UserType) => {
    await dbConnect()
    const encryptedPass = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10))
    newUser.role = 'admin'
    newUser.password = encryptedPass
    newUser.apiKey = generateApiKey(105);
    const checkForUser = await User.find().exec()
    if (checkForUser.length > 0) {
      throw new Error('Admin user already exists')
    } else {
      const adminUser = await new User(newUser)
      await adminUser.save()
      const firstPost = new Post({
        title: 'Hello world!',
        content: '<p>Start writing your content!</p>',
        postedBy: adminUser.username,
        published: false
      })
      await firstPost.save()
      const firstPage = new Post({
        title: 'My first blog page',
        content: '<p>This is the first page of my blog.</p>',
        postedBy: adminUser.username,
        type: 'page',
        published: false
      })
      await firstPage.save()
      return adminUser
    }
  }

  public static async checkIfFirstUser() {
    await dbConnect()
    const count = await User.find().exec()
    if (count.length === 0) {
      return true
    }
    return false
  }

  public static findOne = async (username: string): Promise<UserType> => {
    await dbConnect();
    const user = await User.findOne({username: username}).exec()
    return user
  }
}