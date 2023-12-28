import { NextResponse } from "next/server";
import requireAuth from "@/app/pages/middlewares";
import { prisma } from "../../type";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }
  
  const id: string = params.id.toString();

  const flashcard = await prisma.flashCard.findFirst({
    where: {
      id: id
    },
  });

  console.log(flashcard?.id);

  return NextResponse.json({ flashcard: flashcard });
};