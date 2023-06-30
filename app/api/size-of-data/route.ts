import { NextRequest, NextResponse } from "next/server";
import getSizeOfData from "@/lib/mongodb/dataFunctions";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({req})
  if (!token) {
    return NextResponse.json({message: 'Unauthorized'}, {status: 401})
  }
  const sizeOfData = await getSizeOfData()
  return NextResponse.json(sizeOfData)
}