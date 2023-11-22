import { NextResponse } from "next/server";
import { deleteUserById } from "./api";
import { updateUser } from "./api";
import { UserUpdateInfo } from "../signup/types";
import requireAuth from "../../middlewares";

// modify user info
export const POST = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);
 
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
  }

  const newUserInfo: UserUpdateInfo = await req.json();
  const response = await updateUser(newUserInfo);
  return response;
}

export const DELETE = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);
 
  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
  }

  const response = await deleteUserById(userId);
  return response;
};

