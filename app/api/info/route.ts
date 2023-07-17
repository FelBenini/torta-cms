import Post from "@/lib/mongodb/models/Post";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import Category from "@/lib/mongodb/models/Category";
import Image from "@/lib/mongodb/models/Image";
import PublishedPosts from "@/lib/mongodb/models/PublishedPosts";

export async function GET(req: NextRequest) {
  const token = await getToken({req})
  if (!token) {
    return NextResponse.json({}, {status: 401})
  }
  
  await dbConnect();
  const num_of_posts = await Post.find({type: {$ne: 'page'}, postedBy: token.name}).count().exec();
  const num_of_pages = await Post.find({type: 'page', postedBy: token.name}).count().exec();
  const total_num_of_posts = await Post.find({type: {$ne: 'page'}}).count().exec();
  const total_num_of_pages = await Post.find({type: 'page'}).count().exec();
  const published_posts = await PublishedPosts.find({type: {$ne: 'page'}}).count().exec();
  const published_pages = await PublishedPosts.find({type: 'page'}).count().exec();
  const num_of_categories = await Category.find().count().exec();
  const num_of_images = await Image.find().count().exec();

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