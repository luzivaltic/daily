import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { createUser } from "../users/api";
import { UserSignupInfo } from "./types";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { username, email, password, passwordConfirm } = await req.json();
  const newUser: UserSignupInfo = {
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm
  }
  const response = await createUser(newUser);
  return response;
};