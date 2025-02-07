import SearchBar from "@/components/common/SearchBar";
import IconHolder from "@/components/common/IconHolder";
import {Bell, MenuIcon, User, WalletCards} from "lucide-react";

export default function Header({children}) {
    return (
        <div className={`flex flex-col w-full`}>
            <div className={`flex flex-row h-20 content-between border-b-2 
                border-fuchsia-300 bg-purple-100 bg-opacity-30 justify-between p-3`}>
                <div className={`flex flex-row my-auto justify-between`}>
                    {children}
                    <div>
                        <SearchBar/>
                    </div>
                </div>

                <div className={`flex flex-row-reverse my-auto gap-2`}>
                    <IconHolder>
                        <User className="w-6 h-6 text-gray-500"/>
                    </IconHolder>
                    <div className="w-px bg-gray-400"/>
                    <IconHolder>
                        <Bell className="w-6 h-6 text-gray-500"/>
                    </IconHolder>
                    <IconHolder>
                        <WalletCards className="w-6 h-6 text-gray-500"/>
                        <h6 className={`text-gray-600 font-bold`}>1000</h6>
                    </IconHolder>
                </div>
            </div>

        </div>
    )
}