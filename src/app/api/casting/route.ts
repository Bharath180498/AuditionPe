import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const roleSchema = z.object({
    name: z.string(),
    gender: z.string(),
    ageRange: z.array(z.number()),
    description: z.string(),
});

const castingCallSchema = z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    category: z.string(),
    roles: z.array(roleSchema),
});

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "PRODUCER") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description, location, category, roles } = castingCallSchema.parse(body);

        const castingCall = await prisma.castingCall.create({
            data: {
                title,
                description,
                location,
                category,
                producerId: session.user.id,
                roles: {
                    create: roles.map(role => ({
                        ...role,
                        ageRange: role.ageRange.join('-')
                    }))
                }
            },
            include: {
                roles: true
            }
        });

        return NextResponse.json(castingCall);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 });
        }
        return new NextResponse("An unexpected error occurred", { status: 500 });
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "PRODUCER") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const castingCalls = await prisma.castingCall.findMany({
            where: {
                producerId: session.user.id,
            },
            include: {
                roles: true,
                _count: {
                    select: {
                        roles: {
                            where: {
                                applications: {
                                    some: {}
                                }
                            }
                        }
                    }
                }
            },
        });

        const response = castingCalls.map(cc => ({
            ...cc,
            applicantCount: cc._count.roles
        }))

        return NextResponse.json(response);

    } catch {
        return new NextResponse("An unexpected error occurred", { status: 500 });
    }
} 