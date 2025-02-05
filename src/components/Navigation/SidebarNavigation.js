import OpenwayLogo from "@/components/static/OpenwayLogo";
import {CreditCardIcon, HomeIcon, LayoutDashboardIcon} from "lucide-react";

export default function SidebarNavigation({children}) {
    const navItems = [
        {
            id:1,
            label:"Trang chủ",
            icon: HomeIcon,
            path:"/",
        },
        {
            id:2,
            label:"Dashboard",
            icon: LayoutDashboardIcon,
            path:"/",
        },
        {
            id:3,
            label:"Thông tin cập nhật",
            icon: CreditCardIcon,
            path:"/",
        },
        {
            id:4,
            label:"Thẻ của bạn",
            icon: CreditCardIcon,
            path:"/",
        },
    ]
    return (
        <div className="flex flex-col border-r-2 border-r-fuchsia-300 shadow-md rounded-md overflow-y-auto h-full">
            <div className="flex justify-center border-b border-b-fuchsia-300 rounded-md">
                <OpenwayLogo />
            </div>
            <div className="flex flex-col">
                {navItems.map((navItem, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <navItem.icon className="w-4 h-4"/>
                        {/* Đảm bảo icon hiển thị đúng */}
                        <button>
                            <h2>{navItem.label}</h2>
                        </button>
                    </div>
                ))}
            </div>
            {children}
        </div>
    );
}