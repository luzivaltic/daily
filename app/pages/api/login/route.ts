import { NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  const user: User | null = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (!user || !bcrypt.compare(password, user.hash_password)) {
    return NextResponse.json(
      { message: "Incorrect email or password!" },
      { status: 404 }
    );
  }

  const token = jwt.sign({ sub: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  });

  return NextResponse.json({ 
    "access token": token, 
    message: "Login Success"
  }, { status: 200 });
};
