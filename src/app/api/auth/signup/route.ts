import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ACTOR", "PRODUCER"]),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, role } = userSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        return NextResponse.json(user);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 });
        }
        return new NextResponse("An unexpected error occurred", { status: 500 });
    }
} 