import { Prisma } from "@prisma/client";

interface CategoryType extends Prisma.CategoryCreateInput {
  id: number
}

export class Category {
  id?: string | number
  name: string
  mainCategory?: number | null
  childCategories?: Array<string> | null
  type?: string | null
  constructor(category: CategoryType) {
    this.id = category.id
    this.name = category.name
    this.mainCategory = category.mainCategory
    if (category.childCategories !== '') {
      this.childCategories = category.childCategories?.split(', ')
    } else {
      this.childCategories = []
    }
    this.type = category.type
  }
}