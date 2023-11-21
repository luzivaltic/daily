import { NextResponse } from "next/server";
import { deleteUserById, getUserById } from "../api";
import requireAuth from "@/app/pages/middlewares";

// GET user by userId
export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);
 
  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
  }

  const id = params.userId[0];

  if (id !== userId) {
    return NextResponse.json({ error: "You don't have permission" }, { status: 401 });
  }

  const response = await getUserById(userId);
  return response;
};

export const DELETE = async (req: Request, { params }: { params: { userId: string } }) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);
 
  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
  }

  const id = params.userId[0];

  if (id !== userId) {
    return NextResponse.json({ error: "You don't have permission" }, { status: 401 });
  }

  const response = await deleteUserById(userId);
  return response;
};
