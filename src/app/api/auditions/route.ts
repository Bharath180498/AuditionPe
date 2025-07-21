import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
        const auditions = await prisma.castingCall.findMany({
            include: {
                roles: true,
            },
        });
        return NextResponse.json(auditions);
    } catch {
        return new NextResponse("An unexpected error occurred", { status: 500 });
    }
} 