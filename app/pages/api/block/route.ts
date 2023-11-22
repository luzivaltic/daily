import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import requireAuth from "@/app/pages/middlewares";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }
  
  const blocks = await prisma.block.findMany({
    where: {
      OR: [
        { front_flashcard: { chapter: { subject: { learning: { user_id: userId } } } } },
        { back_flashcard: { chapter: { subject: { learning: { user_id: userId } } } } },
      ]
    },
  });

  return NextResponse.json({ blocks: blocks });
};

export const POST = async (req: Request) => {
  
};

export const PUT = (req: Request) => {

};

export const DELETE = (req: Request) => {

};