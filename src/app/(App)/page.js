"use client";
import CommonBottom from "@/components/common/CommonBottom";
import { useRouter } from "next/navigation";

export default function RootContent() {
    const router = useRouter();
    return (
        <>
            <div className="flex-grow flex-col h-full">
                <div className="relative m-2 p-2 mt-4 md:ml-4 border-gray-300 border rounded flex flex-row flex-wrap gap-2">
                    <span className="absolute -top-3 left-3 font-bold px-1 text-sm text-gray-500">
                        Quick action
                    </span>
                    <div>
                        <CommonBottom className="mx-2" onClick={() => router.push('/cardholder')}>Chủ thẻ</CommonBottom>
                    </div>
                    <div>
                        <CommonBottom className="mx-2" onClick={() => router.push('/card')}>Thẻ</CommonBottom>
                    </div>
                </div>

                <div
                    className="m-2 p-2 md:ml-4 border-gray-300 border rounded flex-grow overflow-auto flex flex-row gap-2">
                    <div className="w-1/3 bg-white p-4 shadow-md">Content 1</div>
                    <div className="w-1/3 bg-white p-4 shadow-md">Content 2</div>
                    <div className="w-1/3 bg-white p-4 shadow-md">Content 3</div>
                </div>
            </div>
        </>
    );
}
