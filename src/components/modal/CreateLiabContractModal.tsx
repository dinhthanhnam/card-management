import { X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton";
import { CreateContractV2, CreateContractInObject, SetCustomDataInObject } from "@/types/create";
import { createContract } from "@/utils/CreateService";
import {Client} from "@/types/client";

interface CreateLiabContractModalProps {
    onClose: () => void;
    client?: Client;
}

export default function CreateLiabContractModal({ onClose, client }: CreateLiabContractModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<CreateContractV2>({
        clientIdentifier: client.clientNumber || "",
        clientSearchMethod: "CLIENT_NUMBER",
        reason: "Tạo liab",
        createContractInObject: {
            institutionCode: "0001",
            branch: "0101",
            productCode: "LIAB_TRAINING01",
            contractName: "Liability Contract"
        },
        setCustomDataInObjects: []
    });
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (id: keyof CreateContractInObject, value: string) => {
        setFormData((prev) => ({
            ...prev,
            createContractInObject: { ...prev.createContractInObject, [id]: value },
        }));
    };

    const handleReasonChange = (value: string) => {
        setFormData((prev) => ({ ...prev, reason: value }));
    };

    const addCustomData = () => {
        setFormData((prev) => ({
            ...prev,
            setCustomDataInObjects: [...prev.setCustomDataInObjects, { addInfoType: "AddInfo01", tagName: "PrevID_01", tagValue: "A1" }],
        }));
    };

    const removeCustomData = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            setCustomDataInObjects: prev.setCustomDataInObjects.filter((_, i) => i !== index),
        }));
    };

    const handleCustomDataChange = (index: number, field: keyof SetCustomDataInObject, value: string) => {
        setFormData((prev) => {
            const newCustomData = [...prev.setCustomDataInObjects];
            newCustomData[index] = { ...newCustomData[index], [field]: value };
            return { ...prev, setCustomDataInObjects: newCustomData };
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await createContract(formData);
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-h-screen">
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
                    <h2 className="text-xl font-bold mb-4 px-4">Tạo hợp đồng đảm bảo - Khách hàng số: #{client.clientNumber || ""}</h2>

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
                                label="Lý do"
                                value={formData.reason}
                                onChange={(e) => handleReasonChange(e.target.value)}
                                placeholder="Tạo liab"
                                required
                            />
                            <FormInput
                                label="Định danh khách hàng"
                                value={formData.clientIdentifier}
                                onChange={(e) => (e.target.value)}
                                placeholder=""
                                required
                            />
                            <FormInput
                                label="Mã tổ chức"
                                value={formData.createContractInObject.institutionCode || ""}
                                onChange={(e) => handleChange("institutionCode", e.target.value)}
                                placeholder="0001"
                                required
                            />
                            <FormInput
                                label="Mã chi nhánh"
                                value={formData.createContractInObject.branch || ""}
                                onChange={(e) => handleChange("branch", e.target.value)}
                                placeholder="0101"
                                required
                            />
                            <FormInput
                                label="Mã sản phẩm"
                                value={formData.createContractInObject.productCode || ""}
                                onChange={(e) => handleChange("productCode", e.target.value)}
                                placeholder="LIAB_TRAINING01"
                                required
                            />
                            <FormInput
                                label="Số CBS"
                                value={formData.createContractInObject.cbsNumber || ""}
                                onChange={(e) => handleChange("cbsNumber", e.target.value)}
                                placeholder=""
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-4 gap-4">
                                <h3 className="text-lg font-semibold">Dữ liệu tùy chọn</h3>
                                <div className="w-32">
                                    <CommonButton onClick={addCustomData} className="flex items-center justify-center p-2 gap-8">
                                        <Plus size={20} />
                                        <span>Thêm</span>
                                    </CommonButton>
                                </div>
                            </div>
                            {formData.setCustomDataInObjects.length > 0 ? (
                                formData.setCustomDataInObjects.map((item, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-4 mb-2">
                                        <FormInput
                                            value={item.addInfoType}
                                            onChange={(e) => handleCustomDataChange(index, "addInfoType", e.target.value)}
                                            placeholder="Type"
                                            label="Loại thông tin thêm"
                                        />
                                        <FormInput
                                            value={item.tagName}
                                            onChange={(e) => handleCustomDataChange(index, "tagName", e.target.value)}
                                            placeholder="Name"
                                            label="Tên loại"
                                        />
                                        <FormInput
                                            value={item.tagValue}
                                            onChange={(e) => handleCustomDataChange(index, "tagValue", e.target.value)}
                                            placeholder="Value"
                                            label="Giá trị"
                                        />
                                        <div className="flex items-center pt-3 h-full">
                                            <button
                                                onClick={() => removeCustomData(index)}
                                                className="p-2 bg-red-500 text-white rounded-md flex items-center justify-center w-full h-10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">Chưa có dữ liệu tùy chọn.</p>
                            )}
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