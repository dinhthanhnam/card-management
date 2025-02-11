import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSearch, placeholder = "Tìm kiếm..." }) {
    return (
        <div className="flex flex-row items-center space-x-2">
            <input
                type="text"
                value={value}
                onChange={onChange} // Đảm bảo state được cập nhật
                onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
                className="input-field pl-3 pr-4 md:w-full sm:w-auto w-2/3"
                placeholder={placeholder}
            />
            <button
                onClick={onSearch} // Đảm bảo khi click sẽ gọi hàm tìm kiếm
                className="border border-fuchsia-300 rounded bg-white p-2 hover:bg-gray-100 duration-100"
            >
                <Search className="w-5 h-5 text-gray-500" />
            </button>
        </div>
    );
}

