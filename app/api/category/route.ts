import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongoose";
import categoriesController from "@/lib/mongodb/controllers/categoriesController";
import { getToken } from "next-auth/jwt";

type categoryType = {
  name: string,
  type: string,
  childCategories: Array<string | ObjectId>,
  mainCategory: string | ObjectId
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json({ 'message': 'Unauthorized' }, { status: 401 })
  }
  const data: categoryType = await req.json()
  const category = await categoriesController.addCategory(data.name, data.type, data.mainCategory)
  if (!category) {
    return NextResponse.json({'message': 'Bad request'}, {status: 400})
  }
  return NextResponse.json(category)
}