import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const revalidate = 10

const prisma = new PrismaClient({})

export async function GET(req: Request, url: any) {
  const title = url.params.title
  const img = await prisma.image.findFirst({where: {title: title,
  day: parseInt(url.params.day),
  month: parseInt(url.params.month),
  year: parseInt(url.params.year)
  }})

  if (!img) {
    return new NextResponse('', {status: 404})
  }
  return new NextResponse(img.data, {headers: {
    'Content-Type': img.contentType}})
}