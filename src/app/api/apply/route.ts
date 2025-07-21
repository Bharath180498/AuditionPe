import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const applicationSchema = z.object({
    roleId: z.string(),
    name: z.string(),
    email: z.string().email(),
    bio: z.string(),
    resume: z.string(),
    headshots: z.array(z.string()),
    videos: z.array(z.string()),
});

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ACTOR") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { roleId, name, email, bio, resume, headshots, videos } = applicationSchema.parse(body);

        const application = await prisma.application.create({
            data: {
                roleId,
                name,
                email,
                bio,
                resume,
                headshots,
                videos,
                actorId: session.user.id,
            },
        });

        return NextResponse.json(application);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 });
        }
        return new NextResponse("An unexpected error occurred", { status: 500 });
    }
} 