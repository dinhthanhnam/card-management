import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import FormInput from "@/components/common/FormInput";
import CommonBottom from "@/components/common/CommonBottom";

export default function CommonModal({ onClose, subject, data}) {
    const modalRef = useRef();

    useEffect(() => {
        // Close the modal when clicking outside of it
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Add event listener for click outside
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-2xl w-full md:w-2/3 md:h-auto relative"
            >
                {/* Close button (X) at the top right corner */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                <div className={`p-layout`}>
                    {subject === "clients" && data && (
                        <div>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Chi tiết khách hàng</h2>
                            </div>
                            <div className={`grid gap-4 grid-cols-4`}>
                                <FormInput label="Họ tên" value={data.firstName} disabled/>
                                <FormInput label="Email" value={data.email} disabled/>
                                <FormInput label="Số điện thoại" value={data.phone} disabled/>
                                <FormInput label="Năm sinh" value={data.dateOfBirth} disabled/>
                                <FormInput label="Thành phố" value={data.address?.city} disabled/>
                                <FormInput label="Đường" value={data.address?.street} disabled/>
                                <FormInput label="Quốc gia" value={data.address?.country} disabled/>
                            </div>
                        </div>
                    )}
                    {subject === "contracts" && data && (
                        <div>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Chi tiết hợp đồng</h2>
                            </div>
                            <div className={`grid gap-4 grid-cols-4`}>
                                <FormInput label="Mã hợp đồng" value={data.contractNumber} disabled/>
                                <FormInput label="Loại hợp đồng" value={data.contractType} disabled/>
                                <FormInput label="Trạng thái" value={data.status || ""} disabled/>
                            </div>
                        </div>
                    )}
                    {subject === "cards" && data && (
                        <div>
                            <div>
                                <h2 className="text-xl font-bold mb-4">Thông tin thẻ</h2>
                            </div>
                            <div className={`grid gap-4 grid-cols-4`}>
                                <FormInput label="Số thẻ" value={data.cardNumber} disabled/>
                                <FormInput label="Loại thẻ" value={data.cardType} disabled/>
                                <FormInput label="Trạng thái thẻ" value={data.cardStatus} disabled/>
                                <FormInput label="PS" value={data.cardScope} disabled/>
                                <FormInput label="Số dư" value={data.cardBalance} disabled/>
                                <FormInput label="Hạn mức" value={data.cardLimit} disabled/>
                                <FormInput label="Ngày hết hạn" value={data.expireAt} disabled/>
                                <FormInput label="Số thẻ cũ" value={data.previousCard || ""} disabled/>
                            </div>
                        </div>
                    )}

                    <div className={`flex flex-row justify-between`}>
                        <CommonBottom>Sửa</CommonBottom>
                        <CommonBottom>Lưu</CommonBottom>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}
