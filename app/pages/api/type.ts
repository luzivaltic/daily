import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export interface UserSignupInfo {
  username: string,
  email: string,
  password: string,
  passwordConfirm: string
}

export interface UserUpdateInfo {
  id: string,
  username: string,
  password: string,
}

export interface BlockCreateInterface {
  contentTypeId: string,
  frontFlashcardId: string,
  backFlashcardId: string,
  contentText: string,
  contentImageUrl: string
};
