import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/prisma/prismaClient";

export async function GET(req: NextRequest) {
  const token = await getToken({req})
  if (!token) {
    return NextResponse.json({}, {status: 401})
  }
  
  const num_of_posts = await prisma.post.count({where: {NOT: {type: 'page'}, postedBy: token?.name as string}})
  const num_of_pages = await prisma.post.count({where: {type: 'page', postedBy: token?.name as string}})
  const total_num_of_posts = await prisma.post.count({where: {NOT: {type: 'page'}}})
  const total_num_of_pages = await prisma.post.count({where: {type: 'page'}})
  const published_posts = await prisma.publishedPost.count({where: {NOT: {type: 'page'}}})
  const published_pages = await prisma.publishedPost.count({where: {type: 'page'}})
  const num_of_categories = await prisma.category.count()
  const num_of_images = await prisma.image.count()

  return NextResponse.json({
    num_of_pages,
    num_of_posts,
    total_num_of_pages,
    total_num_of_posts,
    published_posts,
    published_pages,
    num_of_categories,
    num_of_images
  })
}