export function FormSelect({ label, name, options = [], value = "", disabled = false, className, onChange }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <select
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                className={`!${className} w-full border border-gray-300 p-2 rounded-lg input-field `}
            >
                <option value="">Chọn...</option>
                {options.map((option, index) => (
                    <option className={`mr-4`} key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
