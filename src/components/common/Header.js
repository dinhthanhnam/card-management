"use client";
import SearchBar from "@/components/common/SearchBar";
import IconHolder from "@/components/common/IconHolder";
import {Bell, ChevronRight, HomeIcon, User} from "lucide-react";
import ChevronHolder from "@/components/common/Chevron";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Header({children}) {
    const router = useRouter();
    return (
        <div className={`flex flex-col w-full`}>
            <div className={`flex flex-row h-min content-between border-b-2 
                border-fuchsia-300 bg-purple-100 bg-opacity-30 justify-between p-3`}>
                {/*<div className={`flex flex-row my-auto justify-between`}>*/}
                {/*    {children}*/}
                {/*    <div>*/}
                {/*        <SearchBar/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={`flex flex-row my-auto gap-1`}>
                    {children}
                    <IconHolder>
                        <HomeIcon onClick={() => router.push("/")} className="w-5 h-5 text-gray-500"/>
                    </IconHolder>
                </div>

                <div className={`flex flex-row-reverse my-auto gap-2`}>
                    <IconHolder>
                        <User className="w-6 h-6 text-gray-500"/>
                    </IconHolder>
                    <div className="w-px bg-gray-400"/>
                </div>
            </div>

        </div>
    )
}