import { X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton";
import { CreateIssuingContractWithLiabilityV2, CreateIssuingInObject } from "@/types/create";
import {createContract, createIssuingContractWithLiability} from "@/utils/CreateService";
import {Contract, Client} from "@/types/client";

interface CreateIssuingContractModalProps {
    onClose: () => void;
    client?: Client;
    parentContract?: Contract;
}

export default function CreateIssuingContractModal({ onClose, client, parentContract}: CreateIssuingContractModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<CreateIssuingContractWithLiabilityV2>({
        productCode: "ISSUING_TRAINING01", productCode2: "", productCode3: "",
        clientIdentifier: client?.clientNumber || "",
        clientSearchMethod: "CLIENT_NUMBER",
        liabContractIdentifier: parentContract?.contractNumber || "",
        liabContractSearchMethod: "CONTRACT_NUMBER",
        liabCategory: "Y",
        createIssuingInObject: {
            institutionCode: "0001",
            branch: "0101",
            contractName: "Issuing Contract",
            addInfo01: "",
            addInfo02: "",
        }
    });
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleKeyChange = (id: keyof CreateIssuingContractWithLiabilityV2, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleChange = (id: keyof CreateIssuingInObject, value: string) => {
        setFormData((prev) => ({
            ...prev,
            createIssuingInObject: { ...prev.createIssuingInObject, [id]: value },
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await createIssuingContractWithLiability(formData);
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
                    <h2 className="text-xl font-bold mb-4 px-4">Tạo hợp đồng phát hành {client? `- Khách hàng số # ${client.clientNumber}` : ""}</h2>

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
                                label="Hợp đồng đảm bảo"
                                value={formData.liabCategory}
                                onChange={(e) => handleKeyChange("liabCategory", e.target.value)}
                                placeholder=""
                                required
                            />
                            <FormInput
                                label="Định danh khách hàng"
                                value={formData.clientIdentifier}
                                onChange={(e) => handleKeyChange("clientIdentifier", e.target.value)}
                                required
                                disable={!!client}
                            />
                            <FormInput
                                label="Mã hợp đồng đảm bảo"
                                value={formData.liabContractIdentifier}
                                onChange={(e) => handleKeyChange("liabContractIdentifier", e.target.value)}
                                required
                            />
                            <FormInput
                                label="Mã sản phẩm"
                                value={formData.createIssuingInObject.institutionCode || ""}
                                onChange={(e) => handleChange("institutionCode", e.target.value)}
                                placeholder="0001"
                                required
                            />
                            <FormInput
                                label="Mã chi nhánh"
                                value={formData.createIssuingInObject.branch || ""}
                                onChange={(e) => handleChange("branch", e.target.value)}
                                placeholder="0101"
                                required
                            />
                            <FormInput
                                label="Mã sản phẩm"
                                value={formData.productCode || ""}
                                onChange={(e) => e.target.value}
                                placeholder="0001"
                                required
                            />
                            <FormInput
                                label="Số CBS"
                                value={formData.createIssuingInObject.cbsNumber || ""}
                                onChange={(e) => handleChange("cbsNumber", e.target.value)}
                                placeholder=""
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