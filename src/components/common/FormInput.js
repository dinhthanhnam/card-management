export default function FormInput({ label, type = "text", value = "", disabled = false }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
                type={type}
                value={value}
                disabled={disabled}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-fuchsia-300"
            />
        </div>
    );
}
