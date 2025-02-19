import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("jwt")?.value; // Hoặc lấy từ localStorage nếu cần

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*", "/profile/:path*", "/card/:path*", "/client/:path*", "/contract/:path*", "/transaction/:path*"], // Chỉ bảo vệ các route cần thiết
};
