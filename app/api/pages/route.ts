import CategoriesController from "@/prisma/controllers/categoriesController";
import PostController from "@/prisma/controllers/postController";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

class RemoveDataFromPost {
  title: string = ''
  backgroundImage?: string | null = ''
  publishedAt: Date | null | undefined | string = new Date(Date.now())
  updatedAt: Date | null | undefined | string = new Date(Date.now())
  categories: Array<string> | undefined | null | Prisma.PublishedPostCreatecategoriesInput
  tags: string[] | null | undefined | Prisma.PublishedPostCreatetagsInput
  postUrl: string = ''
  postedBy: string = ''
  summary: string | null | undefined
  constructor(post: Prisma.PublishedPostCreateInput, postUrl: string) {
    this.title = post.title
    this.backgroundImage = post.backgroundImage
    this.publishedAt = post.publishedAt
    this.updatedAt = post.updatedAt
    this.categories = post.categories
    this.tags = post.tags
    this.summary = post.summary
    this.postUrl = postUrl
    this.postedBy = post.postedBy
  }
}

class CreateResponse {
  posts?: RemoveDataFromPost[]
  number_of_pagination?: number
  number_of_pages?: number
  constructor(posts: RemoveDataFromPost[], number_of_pages: number, number_of_posts: number) {
    this.posts = posts
    this.number_of_pagination = number_of_pages
    this.number_of_pages = number_of_posts
  }
}

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
    const queriedData = await PostController.searchForPublishedPosts(searchParams.get('search') as string, page, limit, 'page');
    const modifiedQueriedData = queriedData.posts.map(post => {
      const redirectUrl = `${post.publishedAt?.getDate()}/0${post.publishedAt?.getMonth() as number + 1}/${post.publishedAt?.getFullYear()}/${post.searchTitle}`
      const newPost: any = { ...post, postUrl: redirectUrl };
      return new RemoveDataFromPost(newPost, redirectUrl)
    })
    return NextResponse.json(new CreateResponse(modifiedQueriedData, queriedData.number_of_pages, queriedData.number_of_posts))
  }

  let data;

  if (!searchParams.get('category')) {
    data = await PostController.getPublishedPosts(page, limit, order, 'page');
  } else {
    data = await CategoriesController.findPublishedPostsByCategory(searchParams.get('category') as string, page, limit, order, 'page')
  }

  if (!data) {
    return NextResponse.json({}, {status: 204})
  }

  const modifiedPosts = data.posts.map((post) => {
    const modifiedContent = post.content?.replaceAll('src="../../image', `src="${origin}/image`);
    const redirectUrl = `/${post.searchTitle}`
    const newPost: any = { ...post, content: modifiedContent, postUrl: redirectUrl };
    return new RemoveDataFromPost(newPost, redirectUrl)
  })
  
  return NextResponse.json(new CreateResponse(modifiedPosts, data.number_of_pages, data.number_of_posts))
}