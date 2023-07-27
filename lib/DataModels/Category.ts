import { Prisma } from "@prisma/client";
import { splitString } from "./splitString";

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
    this.childCategories = splitString(category.childCategories as string)
    this.type = category.type
  }
}