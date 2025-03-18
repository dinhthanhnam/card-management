// components/modal/CreateModal.tsx
import { useState, useEffect, useRef } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { ENTITY_CONFIGS } from "./CreateModalConfig";
import { ClientFormData, CardFormData, ContractFormData, IssuingContractFormData, CustomData } from "@/type/CreateFormData";
import {
    createClient,
    createCard,
    createContract,
    createIssuingContractWithLiability,
} from "@/utils/CreateService";

type Subject = "clients" | "cards" | "contracts" | "issuingContract";

type FormDataMap = {
    clients: ClientFormData;
    cards: CardFormData;
    contracts: ContractFormData;
    issuingContract: IssuingContractFormData;
};

interface CreateModalProps<T extends Subject> {
    onClose: () => void;
    subject: T;
}

export default function CreateModal<T extends Subject>({ onClose, subject }: CreateModalProps<T>) {
    const modalRef = useRef<HTMLDivElement>(null);
    const config = ENTITY_CONFIGS[subject];
    const [formData, setFormData] = useState<FormDataMap[T]>(config.initialData as FormDataMap[T]);
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    // Cập nhật field
    const handleChange = (id: keyof FormDataMap[T], value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Thêm custom data
    const addCustomData = () => {
        setFormData((prev) => ({
            ...prev,
            customData: [...prev.customData, { type: "", name: "", value: "" }],
        }));
    };

    // Xóa custom data
    const removeCustomData = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            customData: prev.customData.filter((_, i) => i !== index),
        }));
    };

    // Cập nhật custom data
    const handleCustomDataChange = (index: number, field: keyof CustomData, value: string) => {
        setFormData((prev) => {
            const newCustomData = [...prev.customData];
            newCustomData[index] = { ...newCustomData[index], [field]: value };
            return { ...prev, customData: newCustomData };
        });
    };

    // Submit form
    const handleSubmit = async () => {
        const payload = config.buildPayload(formData);
        try {
            let response: { success: boolean; message: string };
            switch (subject) {
                case "clients":
                    response = await createClient(payload);
                    break;
                case "cards":
                    response = await createCard(payload);
                    break;
                case "contracts":
                    response = await createContract(payload);
                    break;
                case "issuingContract":
                    response = await createIssuingContractWithLiability(payload);
                    break;
                default:
                    throw new Error("Subject không hợp lệ");
            }
            setMessage(response.message || "Thành công!");
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg w-2/3 max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 p-2">
                    <X className="w-6 h-6 text-gray-500" />
                </button>
                <h2 className="text-xl font-bold mb-4">{config.title}</h2>

                {/* Hiển thị message */}
                {message && (
                    <div
                        className={`p-2 mb-4 border rounded-md ${
                            success ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"
                        }`}
                    >
                        {message}
                    </div>
                )}

                {/* Các field chính */}
                <div className="grid grid-cols-2 gap-4">
                    {config.fields.map((field) => (
                        <div key={field.id as string} className="flex flex-col">
                            <label className="mb-1">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                value={formData[field.id] as string}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                required={field.required}
                                className="p-2 border rounded-md"
                            />
                        </div>
                    ))}
                </div>

                {/* Custom data */}
                {config.hasCustomData && (
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Dữ liệu tùy chọn</h3>
                            <button onClick={addCustomData} className="flex items-center p-2 bg-blue-500 text-white rounded-md">
                                <Plus className="w-4 h-4 mr-2" /> Thêm
                            </button>
                        </div>
                        {formData.customData.length > 0 ? (
                            formData.customData.map((item, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4 mb-2">
                                    <input
                                        value={item.type}
                                        onChange={(e) => handleCustomDataChange(index, "type", e.target.value)}
                                        placeholder="Type"
                                        className="p-2 border rounded-md"
                                    />
                                    <input
                                        value={item.name}
                                        onChange={(e) => handleCustomDataChange(index, "name", e.target.value)}
                                        placeholder="Name"
                                        className="p-2 border rounded-md"
                                    />
                                    <input
                                        value={item.value}
                                        onChange={(e) => handleCustomDataChange(index, "value", e.target.value)}
                                        placeholder="Value"
                                        className="p-2 border rounded-md"
                                    />
                                    <button
                                        onClick={() => removeCustomData(index)}
                                        className="p-2 bg-red-500 text-white rounded-md"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Chưa có dữ liệu tùy chọn.</p>
                        )}
                    </div>
                )}

                {/* Nút submit */}
                <div className="mt-6 flex justify-end">
                    <button onClick={handleSubmit} className="p-2 bg-green-500 text-white rounded-md">
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}