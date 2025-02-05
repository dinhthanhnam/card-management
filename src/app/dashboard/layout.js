"use client";
import SidebarNavigation from "@/components/Navigation/SidebarNavigation";
import FormInput from "@/components/common/FormInput";
import {Search} from "lucide-react";
import SearchBar from "@/components/common/SearchBar";
import Header from "@/components/common/Header";

export default function DashboardLayout({ children }) {
    return (
        <div className=" flex flex-row">
            <div className="max-w-full min-h-screen rounded-xl border-fuchsia-300">
                <div className="h-screen w-60 flex-col flex inset-y-0 z-50">
                    <SidebarNavigation/>
                </div>
            </div>
            <Header children={children} />

        </div>

    );
}
