import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: "ACTOR" | "PRODUCER";
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        role: "ACTOR" | "PRODUCER";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "ACTOR" | "PRODUCER";
        name: string | null;
    }
} 