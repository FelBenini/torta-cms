import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/prismaClient'
import { Prisma } from "@prisma/client";
import { RemoveDataFromPost } from "../../post/[day]/[month]/[year]/[slug]/route";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { origin } = new URL(req.url)
  const page = await prisma.publishedPost.findFirst({
    where: {
      searchTitle: params.slug,
      type: 'page'
    }
  })
  if (!page) {
    return NextResponse.json({}, { status: 404 })
  }
  page.content = page.content?.replaceAll('src="../../image', `src="${origin}/image`)

  return NextResponse.json(new RemoveDataFromPost(page));
}