import { PrismaClient } from "@prisma/client";
import { createUser } from "../users/api";
import { UserSignupInfo } from "./types";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { username, email, password, passwordConfirm } = await req.json();
  const newUser: UserSignupInfo = {
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  };
  const response = await createUser(newUser);

  // auto create learning when create user
  const user = (await response.json()).user;
  const userId = user.id;
  const newLearning = await prisma.learning.create({
    data: {
      user_id: userId,
    },
  });

  return NextResponse.json(
    {
      message: "Successfully signup new user!",
      user: user,
      learning: newLearning,
    },
    { status: 201 }
  );
};
