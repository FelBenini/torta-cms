import { NextRequest, NextResponse } from "next/server";
import dbController from "@/prisma/controllers/dbController";
import { getToken } from "next-auth/jwt";

async function getSizeOfData() {
  const data = await dbController.getSizeOfDatabase()
  const total = data.categoryCollection + data.postCollection + data.userCollection + data.imageCollection;
  
  return {
    sizeOfImg: data.imageCollection,
    postgresSize: data,
    total,
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({req})
  if (!token) {
    return NextResponse.json({message: 'Unauthorized'}, {status: 401})
  }
  const sizeOfData = await getSizeOfData()
  return NextResponse.json(sizeOfData)
}