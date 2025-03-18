import React from "react";
import { AsteriskIcon } from "lucide-react";

interface FormSelectProps {
    label: string;
    value?: string;
    name?: string;
    options?: Array<{ value: string; label: string } | string>;
    disabled?: boolean;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    placeholder?: string; // Thêm placeholder nếu cần hiển thị tùy chọn mặc định
}

export function FormSelect({
                               label,
                               name,
                               options = [],
                               value = "",
                               disabled = false,
                               className = "",
                               onChange,
                               required = false,
                               placeholder = "Chọn...",
                           }: FormSelectProps) {
    return (
        <div className="mb-4">
            <div className="flex flex-row justify-between">
                <label className="block text-gray-700 font-medium mb-1">{label}</label>
                {required && <AsteriskIcon size={18} className="text-red-500" />}
            </div>
            <select
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                className={`w-full border border-gray-300 p-2 rounded-lg ${className}`}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option, index) => {
                    const optionValue = typeof option === "object" ? option.value : option;
                    const optionLabel = typeof option === "object" ? option.label : option;

                    return (
                        <option key={index} value={optionValue}>
                            {optionLabel}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}