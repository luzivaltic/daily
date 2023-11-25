import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import requireAuth from "@/app/pages/middlewares";

const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: { subjectId: string } }) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }
  
  const subjectId: string = params.subjectId[0];

  const chapters = await prisma.chapter.findMany({
    where: {
      subject: {
        id: subjectId,
        learning: {
          user_id: userId
        }
      }
    },
  });

  return NextResponse.json({ chapters: chapters });
};