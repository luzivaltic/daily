import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { username, email, password, passwordConfirm } = await req.json();
  if (!username || !email || !password || !passwordConfirm) {
    NextResponse.json({ message: "Invalid username or password" }, { status: 400 });
  }

  if (password.length < 8) {
    NextResponse.json({ message: "Password didn't reach minimum length" }, { status: 400 });
  }

  if (password != passwordConfirm) {
    NextResponse.json({ message: "Password didn't match" }, { status: 400 });
  }
  
  const users: User[] | null = await prisma.user.findMany({
    where: {
      email: {
        equals: email
      }
    }
  });

  if (users.length) {
    return NextResponse.json({ message: "User already existed!" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      hash_password: hashedPassword,
    }
  });

  return NextResponse.json({ 
    message: "Successfully create user!", 
    user: newUser
  }, { 
    status: 201 
  });
};