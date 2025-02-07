"use client";
import OpenwayLogo from "@/components/static/OpenwayLogo";
import {
    CreditCardIcon,
    HomeIcon,
    LayoutDashboardIcon,
    MessageCircleQuestionIcon,
    NewspaperIcon,
} from "lucide-react";
import NavigationButton from "@/components/common/NavigationButton";
import { useState } from "react";

export default function SidebarNavigation({ children }) {
    const [activeIndex, setActiveIndex] = useState(0); // Dùng ID để xác định active

    const navItems = [
        { id: 1, label: "Trang chủ", icon: HomeIcon, path: "/" },
        { id: 2, label: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
        { id: 3, label: "Bản tin", icon: NewspaperIcon, path: "/news" },
        { id: 4, label: "Thẻ của bạn", icon: CreditCardIcon, path: "/cards" },
        { id: 5, label: "Hỗ trợ", icon: MessageCircleQuestionIcon, path: "/support" },
    ];

    return (
        <div className="flex flex-col border-r-2 border-r-fuchsia-300 shadow-md rounded-md overflow-y-auto h-full">
            {/* Logo */}
            <div className="flex h-20 justify-center border-b border-b-fuchsia-300 rounded-md p-4">
                <OpenwayLogo />
            </div>

            {/* Navigation */}
            <div className="flex flex-col">
                {navItems.map((navItem) => (
                    <div key={navItem.id} className="flex items-center space-x-2">
                        <NavigationButton
                            active={activeIndex === navItem.id}
                            onClick={() => setActiveIndex(navItem.id)}
                            href={navItem.path}
                        >
                            <navItem.icon className="w-6 h-6" />
                            <h2>{navItem.label}</h2>
                        </NavigationButton>
                    </div>
                ))}
            </div>

            {children}
        </div>
    );
}
