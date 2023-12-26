import { NextResponse } from "next/server";
import requireAuth from "@/app/api/middlewares";
import { prisma } from "../../type";

export const GET = async (req: Request, { params }: { params: { chapterId: string } }) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const chapterId: string = params.chapterId;

  const flashcards = prisma.flashCard.findMany({
    where: {
      chapter: {
        id: chapterId,
        subject: {
          learning: {
            user_id: userId
          }
        }
      }
    }
  });

  return NextResponse.json({ flashcards: flashcards }, { status: 200 });
};