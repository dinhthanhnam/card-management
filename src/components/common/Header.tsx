"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, User, LogOut, Info } from "lucide-react";
import {IconHolder} from "@/components/common/IconHolder";

export default function Header({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");// Xóa token
        router.push("/login"); // Chuyển hướng về login
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row h-min content-between border-b-2
                border-secondary bg-sky-200 bg-opacity-30 justify-between p-3 relative">

                {/* Left Section */}
                <div className="flex flex-row my-auto gap-1">
                    <IconHolder onClick={() => router.push("/")} active={pathname === "/"}>
                        <HomeIcon className="w-5 h-5 text-gray-500" />
                    </IconHolder>
                    {children}
                </div>

                {/* Right Section */}
                <div className="flex flex-row-reverse my-auto gap-2 relative">
                    {/* Profile Icon with Dropdown */}
                    <div className="relative">
                        <IconHolder onClick={() => setDropdownOpen(!dropdownOpen)} active={pathname === "/profile"}>
                            <User className="w-5 h-5 text-gray-500" />
                        </IconHolder>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg py-2 z-50">
                                <button
                                    onClick={() => router.push("/profile")}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <Info className="w-4 h-4" /> Xem thông tin
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                                >
                                    <LogOut className="w-4 h-4" /> Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="w-px bg-gray-400" />
                </div>
            </div>
        </div>
    );
}
