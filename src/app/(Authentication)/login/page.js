"use client";
import { useEffect, useState } from "react";
import {usePathname, useRouter} from "next/navigation";
import OpenwayLogo from "@/components/static/OpenwayLogo";
import CommonBottom from "@/components/common/CommonButtom";
import FormInput from "@/components/common/FormInput";
import { login } from "@/utils/login";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const pathname = usePathname();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await login(email, password);
        if (userData) {
            window.location.href = "/client"; // Chuyển hướng nếu đăng nhập thành công
        } else {
            setError("Sai tài khoản hoặc mật khẩu");
        }
    };

    useEffect( () =>
        {
            const checkAuth = async () => {
                const token = localStorage.getItem("accessToken");

                if (token && pathname === "/login") {
                    router.push("/login");
                }
            }
        }
    )

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-center p-4">
                <OpenwayLogo />
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
                <div className="container max-w-md">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-6">Đăng nhập</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FormInput label="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <CommonBottom type="submit">Đăng nhập</CommonBottom>
                    </form>
                </div>
            </div>
        </div>
    );
}
