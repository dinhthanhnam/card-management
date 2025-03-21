import React from "react";
import { AsteriskIcon } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho props
interface FormInputProps {
    label: string;
    type?: "text" | "password" | "email" | "number" | "date"; // Hạn chế các giá trị hợp lệ cho types
    name?: string;
    value?: string | number; // Hỗ trợ cả string và number
    disable?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    required?: boolean;
}

export default function FormInput ({
                                                 label,
                                                 type = "text",
                                                 name,
                                                 value = "",
                                                 disable = false,
                                                 onChange,
                                                 className = "",
                                                 placeholder,
                                                 required = false,
                                             }: FormInputProps) {
    return (
        <div className="mb-4">
            <div className="flex flex-row justify-between">
                <label className={`block text-gray-700 font-medium mb-1`}>{label}</label>
                {required && <AsteriskIcon size={18} className="text-red-500" />}
            </div>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disable}
                className={`w-full border border-gray-300 p-2 rounded-lg input-field ${className}`} // Sửa cú pháp className
                placeholder={placeholder}
            />
        </div>
    );
};