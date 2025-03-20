import { X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton";
import { CreateClientV4, CreateClientInObject, SetCustomDataInObject } from "@/types/create";
import { createClient } from "@/utils/CreateService";

interface CreateClientModalProps {
    onClose: () => void;
}

export default function CreateClientModal({ onClose }: CreateClientModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<CreateClientV4>({
        reason: "",
        createClientInObject: {
            institutionCode: "",
            branch: "",
            clientTypeCode: "",
            shortName: "",
            firstName: "",
            lastName: "",
            email: "",
            mobilePhone: "",
            salutationCode: "",
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
            setCustomDataInObjects: [...prev.setCustomDataInObjects, { addInfoType: "", tagName: "", tagValue: "" }],
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
            if (response.success) {
                setTimeout(onClose, 1500); // Tự động đóng modal sau 1.5s nếu thành công
            }
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
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-2xl w-full md:w-2/3 md:h-auto relative"
            >
                {/* Nút đóng (X) ở góc trên bên phải */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                <div className="p-layout">
                    <h2 className="text-xl font-bold mb-4">Tạo Khách Hàng</h2>

                    {/* Thông báo kết quả */}
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
                    <div className="grid gap-4 grid-cols-4">
                        <FormInput
                            label="Lý do"
                            value={formData.reason}
                            onChange={(e) => handleReasonChange(e.target.value)}
                            placeholder="Tạo khách hàng"
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
                            placeholder="Van A"
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
                            label="Chi nhánh"
                            value={formData.createClientInObject.branch || ""}
                            onChange={(e) => handleChange("branch", e.target.value)}
                            placeholder="Hà Nội"
                            required
                        />
                    </div>

                    {/* Custom Data */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Dữ liệu tùy chọn</h3>
                            <button
                                onClick={addCustomData}
                                className="flex items-center p-2 bg-blue-500 text-white rounded-md"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Thêm
                            </button>
                        </div>
                        {formData.setCustomDataInObjects.length > 0 ? (
                            formData.setCustomDataInObjects.map((item, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4 mb-2">
                                    <FormInput
                                        value={item.addInfoType}
                                        onChange={(e) => handleCustomDataChange(index, "addInfoType", e.target.value)}
                                        placeholder="Type" label={"Loại thông tin thêm"}
                                    />
                                    <FormInput
                                        value={item.tagName}
                                        onChange={(e) =>
                                            handleCustomDataChange(index, "tagName", e.target.value)
                                        }
                                        placeholder="Name"
                                        label={"Tên loại"}
                                    />
                                    <FormInput
                                        value={item.tagValue}
                                        onChange={(e) =>
                                            handleCustomDataChange(index, "tagValue", e.target.value)
                                        }
                                        placeholder="Value"
                                        label={"Giá trị"}
                                    />
                                    <button
                                        onClick={() => removeCustomData(index)}
                                        className="p-2 bg-red-500 text-white rounded-md flex items-center justify-center"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Chưa có dữ liệu tùy chọn.</p>
                        )}
                    </div>

                    {/* Nút hành động */}
                    <div className="flex flex-row justify-end mt-6">
                        <CommonButton onClick={handleSubmit}>Tạo</CommonButton>
                    </div>
                </div>
            </div>
        </div>
    );
}