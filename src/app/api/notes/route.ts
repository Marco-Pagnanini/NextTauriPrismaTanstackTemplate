import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const note = await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      isPinned: false
    },
  });
  return NextResponse.json(note, { status: 201 });
}

export async function PUT(request: Request) {
    const body = await request.json();
    const note = await prisma.note.update({
        where: { id: body.id },
        data:{
            title: body.title,
            content: body.content,
            isPinned: body.isPinned

        }
    })
    return NextResponse.json(note);
}
