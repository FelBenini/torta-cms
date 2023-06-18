import dbConnect from "..";
import User, { type UserType } from "../models/User";
import bcrypt from 'bcryptjs'

export class mongooseUserController {
  public static getUserByName = async (username: string) => {
    await dbConnect()
    const user = await User.findOne({username: username}).exec()
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
    const checkForUser = await User.find().exec()
    if (checkForUser.length > 0) {
      throw new Error('Admin user already exists')
    } else {
      const adminUser = new User(newUser)
      await adminUser.save()
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
}