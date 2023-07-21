import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({})

export async function GET(req: NextRequest, { params }: { params: { slug: string, day: string, month: string, year: string }}) {
  const endDate = parseInt(params.day) + 1
  const post = await prisma.publishedPost.findFirst({
    where: {
      searchTitle: params.slug,
      publishedAt: {
        gte: new Date(`${params.year}-${params.month}-${params.day}`),
        lte: new Date(`${params.year}-${params.month}-${endDate}`)
      }
    }
  })
  if (!post) {
    return NextResponse.json({}, {status: 404})
  }
  return NextResponse.json(post);
}