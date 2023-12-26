import { NextResponse } from "next/server";
import requireAuth from "@/app/pages/middlewares";
import { prisma } from "../type";

export const GET = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }
  
  const chapters = await prisma.chapter.findMany({
    where: {
      subject: {
        learning: {
          user_id: userId
        }
      }
    },
  });

  return NextResponse.json({ chapters: chapters });
};

export const POST = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const { subjectId, title } = await req.json();
  try {
    const newChapter = await prisma.chapter.create({
      data: {
        subject_id: subjectId,
        title: title
      },
    });

    return NextResponse.json(
      { message: `Successfully created new chapter`, chapter: newChapter },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid Subject or title!",
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
    const { chapterId } = await req.json();
    await prisma.chapter.update({
      where: {
        id: chapterId,
        subject: {
          learning: {
            user_id: userId,
          }
        }
      },
      data: {
        
      }
    });

    return NextResponse.json({ message: "Update chapter successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update chapter fail!" }, { status: 400 });
  }
};

export const DELETE = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const { chapterId } = await req.json();
  try {
    await prisma.chapter.delete({
      where: {
        id: chapterId,
        subject: { 
          learning: {
            user_id: userId,
          }
        }
      },
    });

    return NextResponse.json(
      { message: `Successfully delete Chapter` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Chapter do not exist!" }, { status: 404 });
  }
};