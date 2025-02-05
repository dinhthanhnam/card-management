import AuthForm from "../../components/Auth/AuthForm";
import OpenwayLogo from "@/components/static/OpenwayLogo";

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Logo trên cùng */}
            <div className="flex justify-center p-4">
                <OpenwayLogo />
            </div>

            {/* AuthForm chiếm phần còn lại */}
            <AuthForm type="signup" />
        </div>
    );
}
