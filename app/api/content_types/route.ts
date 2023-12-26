import { NextResponse } from "next/server";
import { prisma } from "../type";

export const GET = async (req: Request) => {
  const contentTypes = await prisma.contentType.findMany();
  return NextResponse.json({ "content-types": contentTypes }, { status: 200 });
};
