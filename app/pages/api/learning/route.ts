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

  const learning = await prisma.learning.findFirst({
    where: {
      user_id: userId,
    },
  });

  return NextResponse.json({ learning: learning }, { status: 200 });
};

export const POST = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    const newLearning = await prisma.learning.create({
      data: {
        user_id: userId,
      },
    });

    return NextResponse.json(
      {
        message: `Successfully created new Learning ${newLearning.id}`,
        learning: newLearning,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid user!",
      },
      { status: 404 }
    );
  }
};

export const PUT = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    const { learningId } = await req.json();
    await prisma.learning.update({
      where: {
        id: learningId,
        user_id: userId
      },
      data: {
        
      }
    });

    return NextResponse.json({ message: "Update Learning successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update learning fail!" }, { status: 400 });
  }
};

export const DELETE = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    await prisma.learning.delete({
      where: {
        user_id: userId,
      },
    });

    return NextResponse.json(
      { message: `Successfully delete user Learning` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Learning do not exist!" }, { status: 404 });
  }
};
