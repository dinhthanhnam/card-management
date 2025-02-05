import AuthForm from "../../components/Auth/AuthForm";
import OpenwayLogo from "@/components/static/OpenwayLogo";
import CommonBottom from "@/components/common/CommonBottom";

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-center p-4">
                <OpenwayLogo/>
                <div className="absolute right-[10px] w-1/12 hidden md:block">
                    <CommonBottom className="border-l-fuchsia-300 font-bold text-center !text-primary !bg-fuchsia-100">
                        Đăng ký
                    </CommonBottom>
                </div>
            </div>

            <AuthForm type="login"/>
        </div>
    );
}
