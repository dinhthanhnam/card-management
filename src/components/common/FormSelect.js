export function FormSelect({ label, name, options = [], value = "", disabled = false, className, onChange }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <select
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                className={`${className || ""} w-full border border-gray-300 p-2 rounded-lg input-field`}
            >
                <option value="">Chọn...</option>
                {options.map((option, index) => {
                    // Kiểm tra xem option là object hay string
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