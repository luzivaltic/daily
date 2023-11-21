import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { createUser } from "../users/api";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { username, email, password, passwordConfirm } = await req.json();
  const response = await createUser(username, email, password, passwordConfirm);
  return response;
};