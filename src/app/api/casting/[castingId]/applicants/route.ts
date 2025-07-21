import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ castingId: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "PRODUCER") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { castingId } = await params;
        
        const applications = await prisma.application.findMany({
            where: {
                role: {
                    castingCallId: castingId,
                },
            },
            include: {
                actor: true,
                role: true,
            },
        });

        return NextResponse.json(applications);

    } catch {
        return new NextResponse("An unexpected error occurred", { status: 500 });
    }
} 