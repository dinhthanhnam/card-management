"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OpenwayLogo from "@/components/static/OpenwayLogo";
import CommonBottom from "@/components/common/CommonBottom";
import FormInput from "@/components/common/FormInput";
import { login } from "@/utils/login";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await login(email, password);
        if (userData) {
            router.push("/dashboard"); // Chuyển hướng nếu đăng nhập thành công
        } else {
            setError("Sai tài khoản hoặc mật khẩu");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-center p-4">
                <OpenwayLogo />
            </div>

            <div className="flex flex-col items-center justify-center flex-1">
                <div className="container max-w-md">
                    <h2 className="text-3xl font-bold text-center text-primary mb-6">Đăng nhập</h2>
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
