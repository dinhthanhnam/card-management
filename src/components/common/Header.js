import SearchBar from "@/components/common/SearchBar";
import IconHolder from "@/components/common/IconHolder";
import {Bell, User} from "lucide-react";

export default function Header() {
    return (
        <div className={`flex flex-col w-full`}>
            <div className={`flex flex-row h-20 content-between border-b-2 
                border-fuchsia-300 bg-purple-100 bg-opacity-30 justify-between p-3`}>
                <div className={`my-auto`}>
                    <SearchBar/>
                </div>
                <div className={`flex flex-row-reverse my-auto`}>
                    <IconHolder>
                        <User className="w-6 h-6 text-gray-500"/>
                    </IconHolder>
                    <div className="w-px bg-gray-400 mx-2"/>
                    <IconHolder>
                        <Bell className="w-6 h-6 text-gray-500"/>
                    </IconHolder>
                </div>
            </div>

        </div>
    )
}