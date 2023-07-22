import { Prisma } from "@prisma/client"
import bcrypt from 'bcryptjs'
import { prisma } from '../prismaClient'

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

export default class UserController {
  public static getUserByName = async (username: string) => {
    const user = await prisma.user.findFirst({where: {username: {equals: username, mode: 'insensitive'}}})
    if (!user) {
      return null
    }
    return user
  }

  public static createFirstUser = async (newUser: Prisma.UserCreateInput) => {
    newUser.role = 'admin'
    const encryptedPass = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10))
    newUser.apiKey = generateApiKey(105);
    newUser.password = encryptedPass

    const checkForUser = await prisma.user.findFirst()

    if (checkForUser) {
      throw new Error('Admin user already exists')
      return
    }

    const user = await prisma.user.create({data: newUser})
    return user
  }

  public static checkIfFirstUser = async () => {
    const user = await prisma.user.findFirst()

    if (user) {
      return true
    } else {
      return false
    }
  }

  public static findOne = async (name: string) => {
    const user = await prisma.user.findFirst({
      where: {
        username: name
      }
    })
    if (!user) {
      return null
    }
    return user
  }
}