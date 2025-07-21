import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ACTOR") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const applications = await prisma.application.findMany({
            where: {
                actorId: session.user.id,
            },
            include: {
                role: {
                    include: {
                        castingCall: true,
                    },
                },
            },
        });

        return NextResponse.json(applications);

    } catch {
        return new NextResponse("An unexpected error occurred", { status: 500 });
    }
} 