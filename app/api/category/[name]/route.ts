import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import CategoriesController from "@/prisma/controllers/categoriesController";
import { prisma } from "@/prisma/prismaClient";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({}, { status: 401 })
  }
  const category = await prisma.category.findFirst({
    where: {
      name: params.name
    }
  })
  if (!category) {
    return NextResponse.json({}, { status: 404 })
  }
  const num = await prisma.post.count({ where: { categories: { contains: `${params.name}, `}} })

  return NextResponse.json({
    id: category.id,
    name: category.name,
    type: category.type,
    num_of_posts: num,
    childCategories: category.childCategories
  })
}

export async function DELETE(req: NextRequest, { params }: { params: { name: string } }) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({}, { status: 401 })
  }

  const deletion = await CategoriesController.deleteCategory(parseInt(params.name));

  if (!deletion) {
    return NextResponse.json({ 'message': 'Category not found' }, { status: 404 })
  }
  return NextResponse.json(params.name)
}