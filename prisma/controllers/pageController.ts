import { prisma } from "../prismaClient";

export default class PageController {
  public static getAllPages = async (page: number = 1) => {
    const pages = await prisma.post.findMany({
      where: {
        type: 'page'
      },
      take: 15,
      skip: (page - 1) * 15,
      orderBy: {
        createdAt: 'desc'
      }
    })
    const count = await prisma.post.count({
      where: {
        type: 'page'
      }
    })
    return {
      numOfPosts: count,
      posts: pages
    }
  }

  public static getOnePageById = async (id: number) => {
    const page = await prisma.post.findFirst({
      where: {
        id: id,
        type: 'page'
      }
    })
    if (!page) {
      return null
    }
    return page
  }
}