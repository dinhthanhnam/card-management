import {X, Plus, Trash2} from "lucide-react";
import {useState, useEffect, useRef} from "react";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton";
import {CreateClientInObject, CreateClientV4, SetCustomDataInObject} from "@/types/create";
import {Client} from "@/types/client";
import {EditClientInObject, EditClientV6} from "@/types/edit";
import {editClient} from "@/utils/EditService";

interface EditClientModalProps {
    onClose: () => void,
    client: Client,
    onEditClient: (client: Client) => void,
}

export default function EditClientModal({onClose, client, onEditClient}: EditClientModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<EditClientV6>({
        clientIdentifier: client.clientNumber ||"",
        clientSearchMethod: "CLIENT_NUMBER",
        editClientInObject: {
            branch: "",
            clientCategory: "",
            serviceGroup: "",
            productCategory: "",
            clientTypeCode: "",
            shortName: client.shortName || "",
            salutationCode: "",
            salutationSuffix: "",
            gender: "",
            firstName: "",
            middleName: "",
            lastName: "",
            birthDate: "",
            birthPlace: "",
            birthName: "",
            languageCode: "",
            citizenShip: "",
            maritalStatusCode: "",
            taxBracket: "",
            individualTaxpayerNumber: "",
            dateExpire: "",
            homePhone: "",
            mobilePhone: "",
            businessPhone: "",
            homeFax: "",
            businessFax: "",
            email: "",
            country: "",
            state: "",
            city: "",
            addressZip: "",
            addressLine1: "",
            addressLine2: "",
            addressLine3: "",
            addressLine4: "",
            companyName: "",
            trademark: "",
            department: "",
            positionCode: "",
            profession: "",
            embossedLastName: "",
            embossedFirstName: "",
            embossedCompanyName: "",
            embossedTitleCode: "",
            identityCardType: "",
            identityCardNumber: client.regNumber || "",
            identityCardDetails: "",
            clientNumber: client.clientNumber || "",
            secretPhrase: "",
            socialSecurityNumber: "",
            addDate01: "",
            addDate02: "",
            registrationDate: "",
        },
        reason: "",
        setCustomDataInObjects: []

    });
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const normalizeEmbossedName = (value: string): string => {
        return value
            .normalize("NFD") // Chuẩn hóa Unicode, tách dấu khỏi ký tự
            .replace(/[\u0300-\u036f]/g, "") // Xóa các ký tự dấu
            .toUpperCase(); // Viết hoa
    };
    // Cập nhật field trong createClientInObject
    const handleChange = (id: keyof EditClientInObject, value: string) => {
        const needNormalized = ["embossedFirstName", "embossedLastName"];
        setFormData((prev) => ({
            ...prev,
            editClientInObject: {
                ...prev.editClientInObject,
                [id] : needNormalized.includes(id) ? normalizeEmbossedName(value) : value,
            },
        }));
    };

    // Cập nhật reason
    const handleKeyChange = (id: keyof EditClientV6, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    // Thêm custom data
    const addCustomData = () => {
        setFormData((prev) => ({
            ...prev,
            setCustomDataInObjects: [...prev.setCustomDataInObjects, {
                addInfoType: "AddInfo01",
                tagName: "PrevID_01",
                tagValue: "A1"
            }],
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
            newCustomData[index] = {...newCustomData[index], [field]: value};
            return {...prev, setCustomDataInObjects: newCustomData};
        });
    };

    // Submit form
    const handleSubmit = async () => {
        try {
            const response = await editClient(formData);
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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-h-screen z-10">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-2xl w-full md:w-2/3 h-[90vh] flex flex-col relative"
            >
                {/* Nút đóng (X) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500"/>
                </button>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <h2 className="text-xl font-bold mb-4 px-4">Sửa Khách Hàng</h2>

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
                                className={`text-sm !p-2`}
                                label="Lý do"
                                value={formData.reason}
                                onChange={(e) => handleKeyChange("reason", e.target.value)}
                                placeholder="Sửa thông tin"

                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Định danh khách hàng"
                                value={formData.clientIdentifier}
                                onChange={() => {}}
                                placeholder=""
                                
                                disable={!!client}
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Lý do"
                                value={formData.editClientInObject.branch}
                                onChange={(e) => handleChange("branch", e.target.value)}
                                placeholder="0101"
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Dịch vụ"
                                value={formData.editClientInObject.serviceGroup}
                                onChange={(e) => handleChange("serviceGroup", e.target.value)}
                                placeholder="Service Group"
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Loại sản phẩm"
                                value={formData.editClientInObject.productCategory}
                                onChange={(e) => handleChange("productCategory", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Tên ngắn"
                                value={formData.editClientInObject.shortName}
                                onChange={(e) => handleChange("shortName", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Mã xưng hô"
                                value={formData.editClientInObject.salutationCode}
                                onChange={(e) => handleChange("salutationCode", e.target.value)}
                                placeholder="Salutation Code"
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Giới tính"
                                value={formData.editClientInObject.gender}
                                onChange={(e) => handleChange("gender", e.target.value)}
                                placeholder="F/M"
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Tên khách hàng"
                                value={formData.editClientInObject.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Họ"
                                value={formData.editClientInObject.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Tên đệm"
                                value={formData.editClientInObject.middleName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Tình trạng hôn nhân"
                                value={formData.editClientInObject.maritalStatusCode}
                                onChange={(e) => handleChange("maritalStatusCode", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Mã số thuế cá nhân"
                                value={formData.editClientInObject.individualTaxpayerNumber}
                                onChange={(e) => handleChange("individualTaxpayerNumber", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Số điện thoại"
                                value={formData.editClientInObject.mobilePhone}
                                onChange={(e) => handleChange("mobilePhone", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Số điện thoại"
                                value={formData.editClientInObject.embossedFirstName}
                                onChange={(e) => handleChange("embossedFirstName", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Số điện thoại"
                                value={formData.editClientInObject.embossedLastName}
                                onChange={(e) => handleChange("embossedLastName", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Số thẻ định danh"
                                value={formData.editClientInObject.identityCardNumber}
                                onChange={(e) => handleChange("identityCardNumber", e.target.value)}
                                placeholder=""
                                
                            />
                            <FormInput
                                className={`text-sm !p-2`}
                                label="Mã khách hàng thay đổi"
                                value={formData.editClientInObject.clientNumber}
                                onChange={(e) => handleChange("clientNumber", e.target.value)}
                                placeholder=""
                                
                            />

                        </div>

                        {/* Custom Data */}
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-4 gap-4">
                                <h3 className="text-lg font-semibold">Dữ liệu tùy chọn</h3>
                                <div className="w-32">
                                    <CommonButton onClick={addCustomData}
                                                  className="flex items-center justify-center p-2 gap-8">
                                        <Plus size={20}/>
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
                                                <Trash2 className="w-4 h-4"/>
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
                        <CommonButton onClick={handleSubmit}>Sửa</CommonButton>
                    </div>
                </div>
            </div>
        </div>
    );
}