import { X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton";
import {
    CreateCardInObject,
    CreateCardV3
} from "@/types/create";
import {createCard} from "@/utils/CreateService";
import {Contract} from "@/types/client";

interface CreateCardContractModalProps {
    onClose: () => void;
    parentContract?: Contract;
}

export default function CreateCardContractModal({ onClose, parentContract}: CreateCardContractModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<CreateCardV3>({
        contractIdentifier: parentContract?.contractNumber || "",
        productCode: "CARD_TRAINING01",
        productCode2: "", productCode3: "",
        contractSearchMethod: "CONTRACT_NUMBER",
        createCardInObject: {
            cardName: "Card Contract",
            embossedFirstName: "",
            embossedLastName: ""
        }
    });
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const normalizeEmbossedName = (value: string): string => {
        return value
            .normalize("NFD") // Chuẩn hóa Unicode, tách dấu khỏi ký tự
            .replace(/[\u0300-\u036f]/g, "") // Xóa các ký tự dấu
            .toUpperCase(); // Viết hoa
    };

    const handleChange = (id: keyof CreateCardInObject, value: string) => {
        const needNormalized = ["embossedFirstName", "embossedLastName"];
        setFormData((prev) => ({
            ...prev,
            createCardInObject: {
                ...prev.createCardInObject,
                [id]: needNormalized.includes(id) ?  normalizeEmbossedName(value) : value,
            },
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await createCard(formData);
            setMessage(response.message || "Tạo hợp đồng đảm bảo công!");
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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-h-screen z-10">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-2xl w-full md:w-2/3 h-[90vh] flex flex-col relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <h2 className="text-xl font-bold mb-4 px-4">Phát hành thẻ {parentContract? `- Hợp đồng số: #${parentContract.contractNumber}` : ""}</h2>

                    {message && (
                        <div
                            className={`p-2 mb-4 mx-4 border rounded-md ${
                                success ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <div className="flex-1 overflow-auto px-4">
                        <div className="grid gap-4 grid-cols-4">
                            <FormInput
                                label="Hợp đồng phát hành"
                                value={formData.contractIdentifier}
                                onChange={(e) => (e.target.value)}
                                placeholder="Phát hành thẻ"
                                required
                                disable={!!parentContract}
                            />
                            <FormInput
                                label="Mã sản phẩm"
                                value={formData.productCode}
                                onChange={(e) => (e.target.value)}
                                required
                            />
                            <FormInput
                                label="Loại hợp đồng"
                                value={formData.createCardInObject.cardName}
                                onChange={(e) => handleChange("cardName", e.target.value)}
                                required
                            />
                            <FormInput
                                label="Tên thụ hưởng"
                                value={formData.createCardInObject.embossedFirstName}
                                onChange={(e) => handleChange("embossedFirstName", e.target.value)}
                                required
                            />
                            <FormInput
                                label="Họ thụ hưởng"
                                value={formData.createCardInObject.embossedLastName}
                                onChange={(e) => handleChange("embossedLastName", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-end mt-6 px-4 py-2 border-t border-gray-200 bg-white">
                        <CommonButton onClick={handleSubmit}>Tạo</CommonButton>
                    </div>
                </div>
            </div>
        </div>
    );
}