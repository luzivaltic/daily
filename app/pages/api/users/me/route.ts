import { NextResponse } from "next/server";
import { getUserById } from "../api";
import requireAuth from "@/app/pages/middlewares";

// GET user
export const GET = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);
 
  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
  }

  const response = await getUserById(userId);
  return response;
};