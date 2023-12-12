import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import { UserSignupInfo, UserUpdateInfo, prisma } from "../type";
import bcrypt from 'bcrypt';


export const createUser = async (userSignupInfo: UserSignupInfo) => {
  const { username, email, password, passwordConfirm } = userSignupInfo;

  if (!username || !email || !password || !passwordConfirm) {
    NextResponse.json(
      { message: "Invalid username or password" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    NextResponse.json(
      { message: "Password didn't reach minimum length" },
      { status: 400 }
    );
  }

  if (password != passwordConfirm) {
    NextResponse.json({ message: "Password didn't match" }, { status: 400 });
  }

  const users: User[] | null = await prisma.user.findMany({
    where: {
      email: { equals: email, },
    },
  });

  if (users.length) {
    return NextResponse.json(
      { message: "User already existed!" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      hash_password: hashedPassword,
    },
  });

  return NextResponse.json(
    {
      message: "Successfully create user!",
      user: newUser,
    },
    {
      status: 201,
    }
  );
};

export const getUsers = async () => {
  const user = await prisma.user.findMany();

  if (user) {
    return NextResponse.json(
      {
        user: user,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      message: "There is no user!",
    },
    { status: 400 }
  );
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: { equals: userId },
    }
  });

  if (user) {
    return NextResponse.json(
      {
        user: user,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      message: `There is no matched user!`,
    },
    { status: 400 }
  );
};

export const updateUser = async (userUpdateInfo: UserUpdateInfo) => {
  const { id, username, password } = userUpdateInfo;
  const hashedPassword = await bcrypt.hash(password, 10); 
  
  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        username: username,
        hash_password: hashedPassword
      }
    });

    return NextResponse.json({ message: "Update successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
};

export const deleteUserById = async (userId: string) => {
  const user = await prisma.user.delete({
    where: {
      id: userId
    }
  });

  if (user) {
    return NextResponse.json(
      {
        user: user,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      message: `There is no user match with ${userId}!`,
    },
    { status: 400 }
  );
};