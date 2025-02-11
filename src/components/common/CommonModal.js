import { X } from "lucide-react";

export default function CommonModal({ children, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-2xl w-full md:w-2/3 md:h-auto relative">

                {/* Nút đóng (X) ở góc phải */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                {children}
            </div>
        </div>
    );
}
