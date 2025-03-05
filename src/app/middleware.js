import { NextResponse } from "next/server";

export function middleware(req) {
    const authHeader = req.headers.get("authorization");

    console.log(authHeader);
    // Kiểm tra xem header Authorization có tồn tại không
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Lấy token từ header (loại bỏ "Bearer ")
    const token = authHeader.split(" ")[1];

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/profile/:path*",
        "/card/:path*",
        "/client/:path*",
        "/contract/:path*",
        "/transaction/:path*"
    ], // Chỉ bảo vệ các route cần thiết
};
