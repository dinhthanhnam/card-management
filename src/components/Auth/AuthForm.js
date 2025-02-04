import FormInput from "./FormInput";

export default function AuthForm({ type }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="container">
                <h2 className="text-3xl font-bold text-center text-primary mb-layout">
                    {type === "login" ? "Đăng nhập" : "Đăng ký"}
                </h2>
                <form className="space-y-layout">
                    {type === "signup" && <FormInput label="Full Name" type="text" />}
                    <FormInput label="Email" type="email" />
                    <FormInput label="Password" type="password" />
                    <button className="button-primary">{type === "login" ? "Đăng nhập" : "Đăng ký"}</button>
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
