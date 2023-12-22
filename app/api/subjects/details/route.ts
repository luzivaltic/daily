import { NextResponse } from "next/server";
import requireAuth from "@/app/api/middlewares";
import { prisma } from "../../type";

export const GET = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const subjects = await prisma.subject.findMany({
    where: {
      learning: {
        user_id: userId,
      },
    },
    include: {
      chapters: true
    }
  });

  return NextResponse.json({ subjects: subjects });
};