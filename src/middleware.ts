export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/actor/:path*",
        "/producer/:path*",
    ],
} 