"use client";
import CommonBottom from "@/components/common/CommonButtom";
import { useRouter } from "next/navigation";

export default function RootContent() {
    const router = useRouter();
    return (
        <div className={`flex flex-col`}>
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
            </div>
            <div className={`p-2 md:ml-2 h-full gap-2 flex flex-col md:flex-row`}>
                <div className={`container !bg-transparent flex-1 !shadow-none !border-primary !rounded-md`}>
                    <span>Khách hàng mới</span>
                </div>
                <div className={`container !bg-transparent flex-1 !shadow-none !border-primary !rounded-md`}>
                    <span>Hợp đồng sắp hết hạn</span>
                </div>
                <div className={`container !bg-transparent flex-1 !shadow-none !border-primary !rounded-md`}>
                    <span></span>
                </div>
            </div>
        </div>
    );
}
