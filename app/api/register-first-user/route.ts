import { UserFunctions } from "@/lib/db/userFunctions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json()
  const checkFirstUser = await UserFunctions.checkFirstUser()
  if (!checkFirstUser) {
    return NextResponse.json({'message': 'Admin user already register'}, {status: 401})
  } else {
    UserFunctions.createFirstUser(req)
    return NextResponse.json(req, {status: 201})
  }
}