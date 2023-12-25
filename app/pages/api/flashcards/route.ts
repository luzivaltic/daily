import { NextResponse } from "next/server";
import requireAuth from "@/app/pages/middlewares";
import { prisma } from "../type";

export const GET = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const flashcards = await prisma.flashCard.findMany({
    where: {
      chapter: {
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

export const POST = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    const { chapterId, frontContent, backContent } = await req.json();
    
    const newFlashCard = await prisma.flashCard.create({
      data: {
        chapter_id: chapterId,
        front_content: frontContent,
        back_content: backContent
      }
    });

    return NextResponse.json({ message: 'Successfully created new Flashcard', flashcards: newFlashCard }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid Chapters or blocks' });
  }
};

export const PUT = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);
  
  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    const { flashcardId, frontContent, backContent } = await req.json();
    await prisma.flashCard.update({
      where: {
        id: flashcardId,
        chapter: {
          subject: { 
            learning: {
              user_id: userId,
            }
          }
        }
      },
      data: {
        front_content: frontContent,
        back_content: backContent
      }
    });

    return NextResponse.json({ message: "Update successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
};

export const DELETE = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const { flashcardId } = await req.json();
  try {
    await prisma.flashCard.delete({
      where: {
        id: flashcardId,
        chapter: {
          subject: { 
            learning: {
              user_id: userId,
            }
          }
        }
      },
    });

    return NextResponse.json(
      { message: `Successfully delete Flashcard` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Flashcard do not exist!" }, { status: 404 });
  }
};