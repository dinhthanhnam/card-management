import {AsteriskIcon} from "lucide-react";

export default function FormInput({ label, type = "text", name, value = "", disabled = false, onChange, className, placeholder, required = false}) {
    return (
        <div className="mb-4">
            <div className={`flex flex-row justify-between`}>
                <label className="block text-gray-700 font-medium mb-1">{label}</label>
                {required && (
                    <AsteriskIcon size={18} className="text-red-500" />
                )}
            </div>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`!${className} w-full border border-gray-300 p-2 rounded-lg input-field `}
                placeholder={placeholder}
            />

        </div>
    );
}
