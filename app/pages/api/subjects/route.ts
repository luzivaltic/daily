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

  const subjects = await prisma.subject.findMany({
    where: {
      learning: {
        user_id: userId,
      },
    },
  });

  return NextResponse.json({ subjects: subjects });
};

export const POST = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const { learningId, title } = await req.json();
  try {
    const newSubject = await prisma.subject.create({
      data: {
        learning_id: learningId,
        title: title,
      },
    });

    return NextResponse.json(
      { message: `Successfully created new subject`, subject: newSubject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid Learning or title!",
      },
      { status: 400 }
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
    const { subjectId, title } = await req.json();
    await prisma.subject.update({
      where: {
        id: subjectId,
        learning: {
          user_id: userId
        }
      },
      data: {
        title: title
      }
    });

    return NextResponse.json({ message: "Update subject successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update subject fail!" }, { status: 400 });
  }
};

export const DELETE = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const { subjectId } = await req.json();
  try {
    await prisma.subject.delete({
      where: {
        id: subjectId,
        learning: {
          user_id: userId,
        },
      },
    });

    return NextResponse.json(
      { message: `Successfully delete Subject` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Subject do not exist!" }, { status: 404 });
  }
};
