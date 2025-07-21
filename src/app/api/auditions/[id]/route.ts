import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const audition = await prisma.castingCall.findUnique({
      where: { id },
      include: { roles: true },
    });

    if (!audition) {
      return new NextResponse("Audition not found", { status: 404 });
    }

    return NextResponse.json(audition);
  } catch {
    return new NextResponse("An unexpected error occurred", { status: 500 });
  }
}
