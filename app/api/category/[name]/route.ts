import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import CategoriesController from "@/prisma/controllers/categoriesController";
import { prisma } from "@/prisma/prismaClient";
import { Category } from "@/lib/DataModels/Category";

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

  return NextResponse.json(new Category(category))
}

export async function DELETE(req: NextRequest, { params }: { params: { name: string } }) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({}, { status: 401 })
  }

  const deletion = await CategoriesController.deleteCategory(params.name);

  if (!deletion) {
    return NextResponse.json({ 'message': 'Category not found' }, { status: 404 })
  }
  return NextResponse.json(params.name)
}