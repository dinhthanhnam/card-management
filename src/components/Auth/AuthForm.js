import FormInput from "../common/FormInput";
import CommonBottom from "@/components/common/CommonBottom";

export default function AuthForm({ type }) {
    return (
        <div className="flex flex-col items-center justify-center flex-1">
            <div className="container max-w-md">
                <h2 className="text-3xl font-bold text-center text-primary mb-layout">
                    {type === "login" ? "Đăng nhập" : "Đăng ký"}
                </h2>
                <form className="space-y-layout">
                    {type === "signup" && <FormInput label="Họ và tên" type="text" />}
                    <FormInput label="Email" type="email" />
                    <FormInput label="Mật khẩu" type="password" />
                    {type === "signup" && <FormInput label="Xác nhận mật khẩu" type="password" />}
                    <CommonBottom>{type === "login" ? "Đăng nhập" : "Đăng ký"}</CommonBottom>
                </form>
                <p className="mt-layout text-center text-gray-600">
                    {type === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                    <a href={type === "login" ? "/signup" : "/login"} className="text-secondary hover:underline">
                        {type === "login" ? "Đăng ký" : "Đăng nhập"}
                    </a>
                </p>
            </div>
        </div>
    );
}
