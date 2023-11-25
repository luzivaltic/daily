import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import requireAuth from "@/app/pages/middlewares";
import { BlockCreateInterface } from "./types";

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
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    const { 
      contentTypeId, 
      frontFlashcardId, 
      backFlashcardId,
      contentText,
      contentImageUrl,
    }: BlockCreateInterface = await req.json();

    const newBlock = await prisma.block.create({
      data: {
        content_type_id: contentTypeId,
        front_flashcard_id: frontFlashcardId,
        back_flashcard_id: backFlashcardId,
        content_text: contentText,
        content_image_url: contentImageUrl
      }
    })

    return NextResponse.json({ message: 'Successfully created new Block', block: newBlock }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid Flashcard or Content-Type' });
  }
};

export const PUT = async (req: Request) => {
  const header = req.headers;
  const { isAuthorized, userId }: any = await requireAuth(header);

  if (!isAuthorized || !userId) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    const {
      blockId,
      contentTypeId, 
      frontFlashcardId, 
      backFlashcardId,
      contentText,
      contentImageUrl,
    } = await req.json();

    await prisma.block.update({
      where: {
        id: blockId,
      },
      data: {
        content_type_id: contentTypeId,
        front_flashcard_id: frontFlashcardId,
        back_flashcard_id: backFlashcardId,
        content_text: contentText,
        content_image_url: contentImageUrl
      }
    })

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

  const { blockId } = await req.json();
  try {
    await prisma.block.delete({
      where: {
        id: blockId,
      },
    });

    return NextResponse.json(
      { message: `Successfully delete Block` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Block do not exist!" }, { status: 404 });
  }
};