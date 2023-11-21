import { NextResponse } from "next/server";
import { getUsers } from "./api";
import { updateUser } from "./api";
import { UserUpdateInfo } from "../signup/types";
import requireAuth from "../../middlewares";

// GET all users
export const GET = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);
 
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
  }

  const response = await getUsers();
  return response;
};

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

