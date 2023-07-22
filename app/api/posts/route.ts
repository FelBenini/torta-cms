import CategoriesController from "@/prisma/controllers/categoriesController";
import PostController from "@/prisma/controllers/postController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const { origin } = new URL(req.url)
  const page = parseInt(searchParams.get('page') as string) || 1
  const limit = parseInt(searchParams.get('limit') as string) || 15
  let order: 'asc' | 'desc';
  if (searchParams.get('order') !== 'oldest') {
    order = 'desc'
  } else {
    order = 'asc'
  }

  if (searchParams.get('search')) {
    const queriedData = await PostController.searchForPublishedPosts(searchParams.get('search') as string, page, limit);
    return NextResponse.json(queriedData)
  }

  let data;

  if (!searchParams.get('category')) {
    data = await PostController.getPublishedPosts(page, limit, order);
  } else {
    data = await CategoriesController.findPublishedPostsByCategory(searchParams.get('category') as string, page, limit, order)
  }

  if (!data) {
    return NextResponse.json({}, {status: 204})
  }

  const modifiedPosts = data.posts.map((post) => {
    const modifiedContent = post.content?.replaceAll('src="../../image', `src="${origin}/image`);
    const redirectUrl = `${post.publishedAt?.getDate()}/0${post.publishedAt?.getMonth() as number + 1}/${post.publishedAt?.getFullYear()}/${post.searchTitle}`
    return { ...post, content: modifiedContent, postUrl: redirectUrl };
  })

  data.posts = modifiedPosts
  return NextResponse.json(data)
}