import { userController } from "@/lib/mongodb/controllers/userController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json()
  const checkFirstUser = await userController.checkIfFirstUser();
  if (!checkFirstUser) {
    return NextResponse.json({'message': 'Admin user already register'}, {status: 401})
  } else {
    userController.createFirstUser(req)
    return NextResponse.json(req, {status: 201})
  }
}