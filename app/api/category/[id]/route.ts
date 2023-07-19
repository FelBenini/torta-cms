import dbConnect from "@/lib/mongodb";
import Category from "@/lib/mongodb/models/Category";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Post from "@/lib/mongodb/models/Post";
import categoriesController from "@/lib/mongodb/controllers/categoriesController";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const token = await getToken({req})
  if (!token) {
    return NextResponse.json({}, {status: 401})
  }
  await dbConnect();
  const category = await Category.findById(params.id).populate({path: 'childCategories', options: { sort: { '_id': -1 }}}).exec();
  if (!category) {
    return NextResponse.json({}, {status: 404})
  }
  const num = await Post.find({categories: params.id}).count().exec();

  return NextResponse.json({
    _id: category._id,
    name: category.name,
    type: category.type,
    num_of_posts: num,
    childCategories: category.childCategories
  })
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
  const token = await getToken({req})
  if (!token) {
    return NextResponse.json({}, {status: 401})
  }

  const deletion = await categoriesController.deleteCategory(params.id);

  if (!deletion) {
    return NextResponse.json({'message': 'Category not found'}, {status: 404})
  }
  return NextResponse.json(params.id)
}