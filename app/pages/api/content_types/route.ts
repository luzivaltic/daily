import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  const contentTypes = await prisma.contentType.findMany();
  return NextResponse.json({ "content-types": contentTypes }, { status: 200 });
};
