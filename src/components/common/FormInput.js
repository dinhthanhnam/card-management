export default function FormInput({ label, type = "text", name, value = "", disabled = false, onChange, className }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`${className} w-full border border-gray-300 p-2 rounded-lg input-field `}
            />
        </div>
    );
}
