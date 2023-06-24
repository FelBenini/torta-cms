import { PostFunctions } from "@/lib/db/postFunctions";
import { getToken } from "next-auth/jwt"
import { NextResponse, NextRequest } from "next/server"

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
  const token = await getToken({req});
  if (!token) {
    return NextResponse.json({'message': 'Unauthorized'}, {status: 401})
  }
  const body = await req.json()
  const {id} = params;
  const summary = await PostFunctions.updateSummary(id, body.summary)
  return NextResponse.json(summary);
}