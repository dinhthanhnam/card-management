"use client";
import AuthForm from "../../../components/Auth/AuthForm";
import OpenwayLogo from "@/components/static/OpenwayLogo";
import CommonBottom from "@/components/common/CommonBottom";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen">
            {/* Logo trên cùng */}
            <div className="flex justify-center p-4">
                <OpenwayLogo/>
                <div className="absolute right-[10px] w-1/12 hidden md:block">
                    <CommonBottom className="border-l-fuchsia-300 font-bold text-center !text-primary !bg-fuchsia-100" onClick={()=> router.push("/login")}>
                        Đăng nhập
                    </CommonBottom>
                </div>
            </div>

            {/* AuthForm chiếm phần còn lại */}
            <AuthForm type="signup"/>
        </div>
    );
}
