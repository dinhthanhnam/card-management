"use client";
import FormInput from "@/components/common/FormInput";
import CommonBottom from "@/components/common/CommonButtom";

export default function ProfilePage({ children }) {
    const user = JSON.parse(localStorage.getItem("user")) || {}; // Fix lỗi
    return (
        <div className="container md:w-2/3 m-layout">
            <h2 className="text-3xl font-bold text-center text-secondary mb-layout">
                Thông tin cá nhân
            </h2>
            <form className="space-y-layout">
                <FormInput label="Họ tên" type="text" value={user.name || ""} disabled={true} />
                <FormInput label="Email" type="email" value={user.email || ""} disabled={true} />
                <FormInput label="Mật khẩu" type="password" disabled={true} />

                <div className="m-layout flex flex-col sm:flex-row gap-4">
                    <CommonBottom className="flex-1 sm:w-auto px-6 py-2" type="submit">
                        Sửa
                    </CommonBottom>
                    <CommonBottom className="flex-1 sm:w-auto px-6 py-2" type="submit">
                        Lưu
                    </CommonBottom>
                </div>
            </form>
        </div>
    );
}
