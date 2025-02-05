"use client";
import { useRouter } from "next/navigation";

export default function NavigationButton({ children, active, onClick, href }) {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                if (href) {
                    router.push(href); // Điều hướng trang khi bấm vào button
                }
                if (onClick) {
                    onClick(); // Gọi thêm sự kiện onClick nếu có
                }
            }}
            className={`w-full flex gap-2 items-center p-4 px-6 text-gray-500 hover:bg-fuchsia-100 transition-colors duration-200 ease-in-out 
            ${active ? "bg-fuchsia-200 !text-fuchsia-500 font-semibold" : ""}`}
        >
            {children}
        </button>
    );
}
