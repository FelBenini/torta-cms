import { prisma } from "../prismaClient";

export default class CategoriesController {
  public static getCategories = async () => {
    const categories = await prisma.category.findMany({
      where: {
        type: 'father'
      }
    })
    return categories
  }

  public static addCategory = async (name: string, type: string = 'father', fatherCategory?: string) => {
    if (type === 'father') {
      const newCategory = await prisma.category.create({
        data: {
          name: name,
          type: type
        }
      })
      return newCategory
    }
    const newCategory = await prisma.category.create({
      data: {
        name: name,
        type: type,
        mainCategory: fatherCategory
      }
    })
    const categoryToUpdate = await prisma.category.findFirst({ where: { id: fatherCategory } })
    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryToUpdate?.id
      },
      data: {
        childCategories: `${categoryToUpdate?.childCategories}, ${newCategory.name}`
      }
    })
    return newCategory
  }

  public static findPublishedPostsByCategory = async (categoryName: string, page: number, limit: number, order: 'desc' | 'asc', type: 'post' | 'page') => {
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName
      }
    })
    if (!category) {
      return null
    }
    const posts = await prisma.publishedPost.findMany({
      where: {
        categories: {
          contains: `${categoryName},`
        },
        type: type
      },
      orderBy: [
        { createdAt: order }
      ],
      take: limit,
      skip: (page - 1) * limit
    })
    const count = await prisma.publishedPost.count({
      where: {
        categories: {
          contains: `${categoryName},`
        },
        type: type
      }
    })
    const numOfPages = Math.ceil(count / 15)
    return {
      number_of_pages: numOfPages,
      number_of_posts: count,
      posts: posts
    }
  }

  public static deleteCategory = async (id: string) => {
    const categoryFind = await prisma.category.findFirst({
      where: {
        id: id
      }
    })
    if (!categoryFind) {
      return null
    }
    if (categoryFind.type === 'child') {
      const categoryFather = await prisma.category.findFirst({ where: { id: categoryFind?.mainCategory as string } })
      if (!categoryFather) {
        return null
      }
      const arrayChildCategories = categoryFather.childCategories?.split(', ')
      const updatedChildCategories = arrayChildCategories?.filter((category) => category !== categoryFind.name) 
      await prisma.category.update({
        where: {
          id: categoryFather?.id as string
        },
        data: {
          childCategories: `${updatedChildCategories?.join(', ')}, `
        }
      })
    }
    const category = await prisma.category.delete({
      where: {
        id: id
      }
    })
    return categoryFind
  }
}