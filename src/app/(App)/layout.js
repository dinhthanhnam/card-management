"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import LoadingBar from "../../components/Visibility/LoadingBar";
import SidebarNavigation from "@/components/Navigation/SidebarNavigation";
import Header from "@/components/common/Header";
import IconHolder from "@/components/common/IconHolder";
import { ChevronRight, MenuIcon } from "lucide-react";
import ChevronHolder from "@/components/common/Chevron";
import api from "@/utils/axiosinstance";

export default function AppLayout({ children }) {
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra token trước khi render nội dung
        const checkAuth = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token && pathname !== "/login") {
                router.push("/login");
                return;
            }

            if (token) {
                try {
                    const res = await api.get("auth/me", {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    if(res.data) localStorage.setItem("user", JSON.stringify(res.data));
                } catch (error) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    router.push("/login");
                }
            }
        };

        checkAuth();
    }, [pathname, router]);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <html lang="en">
        <body className="bg-gradient-purple min-h-screen relative">
        <LoadingBar loading={loading} />
        <div className="flex flex-row">
            {/* Sidebar Desktop */}
            <div className="hidden md:block w-60 h-screen">
                <SidebarNavigation />
            </div>

            {/* Sidebar Mobile (Overlay) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            <div
                className={`fixed top-0 left-0 h-full w-60 bg-white shadow-lg transform z-50 transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <SidebarNavigation />
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full">
                <div className="flex flex-row">
                    <div className="md:hidden border-b-2 border-secondary bg-sky-100 content-center">
                        <IconHolder>
                            <MenuIcon
                                className="w-5 h-5 text-gray-500 cursor-pointer"
                                onClick={() => setIsSidebarOpen(true)}
                            />
                        </IconHolder>
                    </div>

                    <Header>
                        {pathname === "/client" && (
                            <>
                                <ChevronHolder>
                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                </ChevronHolder>
                                <IconHolder active={pathname === "/client"} onClick={() => router.push("/cardholder")}>
                                    <p className="text-sm text-gray-600">Danh sách khách hàng</p>
                                </IconHolder>
                            </>
                        )}
                        {pathname === "/contract" && (
                            <>
                                <ChevronHolder>
                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                </ChevronHolder>
                                <IconHolder active={pathname === "/contract"} onClick={() => router.push("/transaction")}>
                                    <p className="text-sm text-gray-600">Danh sách hợp đồng</p>
                                </IconHolder>
                            </>
                        )}
                        {pathname === "/card" && (
                            <>
                                <ChevronHolder>
                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                </ChevronHolder>
                                <IconHolder active={pathname === "/card"} onClick={() => router.push("/card")}>
                                    <p className="text-sm text-gray-600">Danh sách thẻ</p>
                                </IconHolder>
                            </>
                        )}
                        {pathname === "/transaction" && (
                            <>
                                <ChevronHolder>
                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                </ChevronHolder>
                                <IconHolder active={pathname === "/transaction"} onClick={() => router.push("/transaction")}>
                                    <p className="text-sm text-gray-600">Danh sách giao dịch</p>
                                </IconHolder>
                            </>
                        )}
                    </Header>
                </div>

                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
