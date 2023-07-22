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
    if (fatherCategory) {
      const father = await prisma.category.findFirst({
        where: {
          name: name
        }
      })
    }
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
    const categoryToUpdate = await prisma.category.findFirst({where: { id: fatherCategory }})
    const updatedCategory = await prisma.category.update({
      where: {
        id: fatherCategory
      },
      data: {
        childCategories: {
          set: [...categoryToUpdate?.childCategories as string[], newCategory.id]
        }
      }
    })
    return newCategory
  }

  public static findPublishedPostsByCategory = async (categoryName: string, page: number, limit: number, order: 'desc' | 'asc') => {
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName
      }
    })
    if (!category) {
      return null
    }
    const posts = await prisma.post.findMany({
      where: {
        categories: {
          has: category.id
        }
      }
    })
  }
}