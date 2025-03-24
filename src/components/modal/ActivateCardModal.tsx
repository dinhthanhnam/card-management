import {Contract} from "@/types/client";
import {Plus, Trash2, X} from "lucide-react";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton";
import {useEffect, useRef, useState} from "react";
import {activateCard} from "@/utils/activatecard";

interface ActivateCardModalProps {
    cardContract?: Contract;
    onClose: () => void;
}

export default function ActivateCardModal ({cardContract, onClose}: ActivateCardModalProps)  {
    const modalRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [payload, setPayload] = useState({
        contractIdentifier: cardContract? cardContract.contractNumber : null,
        contractSearchMethod: "CONTRACT_NUMBER",
        reason: "",
    })
    // const [cardNumber, setCardNumber] = useState<string | null>(cardContract ? cardContract.contractNumber : null);

    // Submit form
    const handleSubmit = async () => {
        try {
            const response = await activateCard(payload);
            setMessage(response.message);
            setSuccess(response.success);
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Có lỗi xảy ra");
            setSuccess(false);
        }
    };

    // Đóng modal khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-2xl flex flex-col relative w-1/3"
            >
                {/* Nút đóng (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500"/>
                </button>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <h2 className="text-xl font-bold mb-4 px-4">Kích Hoạt Thẻ {cardContract? `- ${cardContract.contractNumber}` : ""}</h2>

                    {/* Thông báo kết quả */}
                    {message && (
                        <div
                            className={`p-2 mb-4 mx-4 border rounded-md ${
                                success ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Khu vực nhập liệu với overflow-auto */}
                    <div className="flex-1 overflow-auto px-4">
                        <div>
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Lý do"
                                value={payload.reason}
                                onChange={(e) => setPayload({...payload, reason: e.target.value})}
                                placeholder="Kích hoạt thẻ"
                            />
                        </div>
                        <div>
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Mã số thẻ"
                                value={payload.contractIdentifier}
                                onChange={(e) => setPayload({...payload, contractIdentifier: e.target.value})}
                                placeholder="Mã số thẻ"
                                disable={!!cardContract}
                            />
                        </div>
                    </div>

                    {/* Nút hành động cố định */}
                    <div className="flex flex-row justify-end mt-6 px-4 py-2 border-t border-gray-200 bg-white">
                        <CommonButton onClick={handleSubmit}>Kích hoạt</CommonButton>
                    </div>
                </div>
            </div>
        </div>
    );
}