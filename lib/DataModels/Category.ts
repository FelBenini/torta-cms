import { Prisma } from "@prisma/client";

export class Category {
  id?: string | number
  name: string
  mainCategory?: string | null
  childCategories?: Array<string> | null
  type?: string | null
  constructor(category: Prisma.CategoryCreateInput) {
    this.id = category.id
    this.name = category.name
    this.mainCategory = category.mainCategory
    this.childCategories = category.childCategories?.split(', ')
    this.type = category.type
  }
}