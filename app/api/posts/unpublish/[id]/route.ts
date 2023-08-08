import { getToken } from "next-auth/jwt"
import { NextResponse, NextRequest } from "next/server"
import { prisma } from '@/prisma/prismaClient'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const token = await getToken({ req });
    if (!token) {
        return NextResponse.json({ status: 401 })
    }
    const id = parseInt(params.id)
    const draftPost = await prisma.post.findFirst({
        where: {
            id: id
        }
    })
    const publishedId = draftPost?.publishedPost
    await prisma.post.update({
        where: {
            id: id
        },
        data: {
            published: false,
            publishedPost: null,
            publishedAt: null
        }
    })
    await prisma.publishedPost.delete({ where: { id: publishedId as number } })
}