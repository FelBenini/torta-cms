import dbConnect from "@/lib/mongodb";
import Category from "@/lib/mongodb/models/Category";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

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
  return NextResponse.json(category)
}