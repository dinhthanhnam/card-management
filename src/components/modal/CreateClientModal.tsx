import { X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton";
import { CreateClientV4, CreateClientInObject, SetCustomDataInObject } from "@/types/create";
import { createClient } from "@/utils/CreateService";
import {upperCase} from "lodash";

interface CreateClientModalProps {
    onClose: () => void;
}

export default function CreateClientModal({ onClose }: CreateClientModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<CreateClientV4>({
        reason: "Tạo khách hàng",
        createClientInObject: {
            institutionCode: "0001",
            branch: "0101",
            clientTypeCode: "PR",
            clientNumber: "",
            identityCardNumber: "",
            shortName: "",
            firstName: "",
            lastName: "",
            email: "",
            mobilePhone: "",
            salutationCode: "MR",
            embossedFirstName: "",
            embossedLastName: "",
            embossedCompanyName: "",
        },
        setCustomDataInObjects: [],
    });
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    // Cập nhật field trong createClientInObject
    const handleChange = (id: keyof CreateClientInObject, value: string) => {
        setFormData((prev) => ({
            ...prev,
            createClientInObject: { ...prev.createClientInObject, [id]: value },
        }));
    };

    // Cập nhật reason
    const handleReasonChange = (value: string) => {
        setFormData((prev) => ({ ...prev, reason: value }));
    };

    // Thêm custom data
    const addCustomData = () => {
        setFormData((prev) => ({
            ...prev,
            setCustomDataInObjects: [...prev.setCustomDataInObjects, { addInfoType: "AddInfo01", tagName: "PrevID_01", tagValue: "A1" }],
        }));
    };

    // Xóa custom data
    const removeCustomData = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            setCustomDataInObjects: prev.setCustomDataInObjects.filter((_, i) => i !== index),
        }));
    };

    // Cập nhật custom data
    const handleCustomDataChange = (index: number, field: keyof SetCustomDataInObject, value: string) => {
        setFormData((prev) => {
            const newCustomData = [...prev.setCustomDataInObjects];
            newCustomData[index] = { ...newCustomData[index], [field]: value };
            return { ...prev, setCustomDataInObjects: newCustomData };
        });
    };

    // Submit form
    const handleSubmit = async () => {
        try {
            const response = await createClient(formData);
            setMessage(response.message || "Tạo khách hàng thành công!");
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
                {/* Nút đóng (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <h2 className="text-xl font-bold mb-4 px-4">Tạo Khách Hàng</h2>

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
                        <div className="grid gap-4 grid-cols-4">
                            <FormInput
                                label="Lý do"
                                value={formData.reason}
                                onChange={(e) => handleReasonChange(e.target.value)}
                                placeholder="Tạo khách hàng"
                                required
                            />
                            <FormInput
                                label="Mã tổ chức"
                                value={formData.createClientInObject.institutionCode || ""}
                                onChange={(e) => handleChange("institutionCode", e.target.value)}
                                placeholder="0001"
                                required
                            />
                            <FormInput
                                label="Mã chi nhánh"
                                value={formData.createClientInObject.branch || ""}
                                onChange={(e) => handleChange("branch", e.target.value)}
                                placeholder="0101"
                                required
                            />
                            <FormInput
                                label="Mã loại khách hàng"
                                value={formData.createClientInObject.clientTypeCode || ""}
                                onChange={(e) => handleChange("clientTypeCode", e.target.value)}
                                placeholder="PR"
                                required
                            />
                            <FormInput
                                label="Số khách hàng"
                                value={formData.createClientInObject.clientNumber || ""}
                                onChange={(e) => handleChange("clientNumber", e.target.value)}
                                placeholder=""
                                required
                            />
                            <FormInput
                                label="Số đăng kí khách hàng"
                                value={formData.createClientInObject.identityCardNumber || ""}
                                onChange={(e) => handleChange("identityCardNumber", e.target.value)}
                                placeholder=""
                                required
                            />
                            <FormInput
                                label="Tên ngắn"
                                value={formData.createClientInObject.shortName || ""}
                                onChange={(e) => handleChange("shortName", e.target.value)}
                                placeholder="Nguyen Van A"
                            />
                            <FormInput
                                label="Tên"
                                value={formData.createClientInObject.firstName || ""}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                placeholder="A"
                            />
                            <FormInput
                                label="Họ"
                                value={formData.createClientInObject.lastName || ""}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                placeholder="Nguyen"
                            />
                            <FormInput
                                label="Email"
                                value={formData.createClientInObject.email || ""}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="email@example.com"
                            />
                            <FormInput
                                label="Số điện thoại"
                                value={formData.createClientInObject.mobilePhone || ""}
                                onChange={(e) => handleChange("mobilePhone", e.target.value)}
                                placeholder="0123456789"
                                required
                            />
                            <FormInput
                                label="Mã xưng hô"
                                value={formData.createClientInObject.salutationCode || ""}
                                onChange={(e) => handleChange("salutationCode", e.target.value)}
                                placeholder="MR"
                                required
                            />
                            <FormInput
                                label="Tên thụ hưởng"
                                value={formData.createClientInObject.embossedFirstName || ""}
                                onChange={(e) => handleChange("embossedFirstName", upperCase(e.target.value))}
                                placeholder="A"
                                required
                            />
                            <FormInput
                                label="Họ thụ hưởng"
                                value={formData.createClientInObject.embossedLastName || ""}
                                onChange={(e) => handleChange("embossedLastName", upperCase(e.target.value))}
                                placeholder="THANH"
                                required
                            />
                        </div>

                        {/* Custom Data */}
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

                    {/* Nút hành động cố định */}
                    <div className="flex flex-row justify-end mt-6 px-4 py-2 border-t border-gray-200 bg-white">
                        <CommonButton onClick={handleSubmit}>Tạo</CommonButton>
                    </div>
                </div>
            </div>
        </div>
    );
}