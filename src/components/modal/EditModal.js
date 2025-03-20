import { X, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormInput from "@/components/common/FormInput";
import CommonButton from "@/components/common/CommonButton"; // Giả định tên đúng là CommonButton
import { editClient, editContract } from "@/utils/EditService"; // Giả định hàm gửi request chỉnh sửa

// Các config cho từng loại đối tượng
const ENTITY_CONFIGS = {
    clients: {
        title: "Edit GetClient",
        fields: [
            { id: "clientSearchMethod", label: "GetClient Search Method", path: "clientSearchMethod", placeholder: "CLIENT_NUMBER", required: true },
            { id: "clientIdentifier", label: "GetClient Identifier", path: "clientIdentifier", placeholder: "GetClient Number", required: true },
            { id: "reason", label: "Reason", path: "reason", placeholder: "Edit client" },
            { id: "editClientInObject.shortName", label: "Short Name", path: "editClientInObject.shortName" },
            { id: "editClientInObject.firstName", label: "First Name", path: "editClientInObject.firstName" },
            { id: "editClientInObject.lastName", label: "Last Name", path: "editClientInObject.lastName" },
            { id: "editClientInObject.email", label: "Email", path: "editClientInObject.email" },
            { id: "editClientInObject.maritalStatusCode", label: "Marital Status", path: "editClientInObject.maritalStatusCode", placeholder: "D" },
            { id: "editClientInObject.branch", label: "Branch", path: "editClientInObject.branch", placeholder: "0101" },
            { id: "editClientInObject.mobilePhone", label: "Mobile Phone", path: "editClientInObject.mobilePhone", placeholder: "10 digits" },
            { id: "editClientInObject.identityCardNumber", label: "Identity Card Number", path: "editClientInObject.identityCardNumber", placeholder: "10 digits" },
            { id: "editClientInObject.clientNumber", label: "GetClient Number", path: "editClientInObject.clientNumber", placeholder: "13 digits" },
            { id: "editClientInObject.clientTypeCode", label: "GetClient Type Code", path: "editClientInObject.clientTypeCode", placeholder: "PR" },
            { id: "editClientInObject.individualTaxpayerNumber", label: "Individual Taxpayer Number", path: "editClientInObject.individualTaxpayerNumber", placeholder: "12 digits" },
            { id: "editClientInObject.addressLine1", label: "Address Line 1", path: "editClientInObject.addressLine1", placeholder: "Ha Noi Viet Nam" },
            { id: "editClientInObject.citizenship", label: "Citizenship", path: "editClientInObject.citizenship", placeholder: "VNM" },
            { id: "editClientInObject.companyName", label: "Company Name", path: "editClientInObject.companyName", placeholder: "OpenWay" },
            { id: "editClientInObject.salutationCode", label: "Salutation Code", path: "editClientInObject.salutationCode", placeholder: "MR" },
            { id: "editClientInObject.embossedFirstName", label: "Embossed First Name", path: "editClientInObject.embossedFirstName" },
            { id: "editClientInObject.embossedLastName", label: "Embossed Last Name", path: "editClientInObject.embossedLastName" },
        ],
        hasCustomData: true,
    },
    contracts: {
        title: "Edit Contract",
        fields: [
            { id: "contractSearchMethod", label: "Contract Search Method", path: "contractSearchMethod", placeholder: "CONTRACT_NUMBER", required: true },
            { id: "contractIdentifier", label: "Contract Identifier", path: "contractIdentifier", placeholder: "Contract Number", required: true },
            { id: "reason", label: "Reason", path: "reason", placeholder: "Edit contract" },
            { id: "editContractInObject.branch", label: "Branch", path: "editContractInObject.branch", placeholder: "0101" },
            { id: "editContractInObject.contractName", label: "Contract Name", path: "editContractInObject.contractName", placeholder: "Liability Contract" },
            { id: "editContractInObject.productCode", label: "Product Code", path: "editContractInObject.productCode", placeholder: "ISS_CR_P_LIB" },
        ],
        hasCustomData: true,
    },
};

export default function EditModal({ onClose, subject, client }) {
    const modalRef = useRef();
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [responseData, setResponseData] = useState({});
    const entityConfig = ENTITY_CONFIGS[subject] || { title: "", fields: [], hasCustomData: false };

    // Khởi tạo state ban đầu dựa trên dữ liệu client (nếu có) hoặc mặc định
    const getInitialState = () => {
        switch (subject) {
            case "clients":
                return {
                    clientSearchMethod: client?.clientSearchMethod || "CLIENT_NUMBER",
                    clientIdentifier: client?.clientNumber || "",
                    reason: "",
                    editClientInObject: {
                        shortName: client?.shortName || "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        maritalStatusCode: "",
                        branch: "",
                        mobilePhone: "",
                        identityCardNumber: "",
                        clientNumber: "",
                        clientTypeCode: "",
                        individualTaxpayerNumber: "",
                        addressLine1: "",
                        citizenship: "",
                        companyName: "",
                        salutationCode: "",
                        embossedFirstName: "",
                        embossedLastName: "",
                    },
                    setCustomDataInObjects: [],
                };
            case "contracts":
                return {
                    contractSearchMethod: "CONTRACT_NUMBER",
                    contractIdentifier: "",
                    reason: "",
                    editContractInObject: {
                        branch: "",
                        contractName: "",
                        productCode: "",
                    },
                    setCustomDataInObjects: [],
                };
            default:
                return { setCustomDataInObjects: [] };
        }
    };

    const [formData, setFormData] = useState(getInitialState());

    // Hàm cập nhật giá trị cho trường nested object
    const updateNestedValue = (obj, path, value) => {
        const parts = path.split(".");
        const lastProp = parts.pop();
        const target = parts.reduce((acc, part) => {
            if (!(part in acc)) acc[part] = {};
            return acc[part];
        }, obj);
        target[lastProp] = value;
        return { ...obj };
    };

    // Xử lý onChange cho field
    const handleFieldChange = (path, value) => {
        setFormData((prevData) => updateNestedValue({ ...prevData }, path, value));
    };

    // Lấy giá trị từ path
    const getValueByPath = (obj, path) => {
        return path.split(".").reduce((o, i) => (o && o[i] !== undefined ? o[i] : ""), obj);
    };

    // Xử lý thêm custom data field
    const addCustomDataField = () => {
        setFormData((prevData) => ({
            ...prevData,
            setCustomDataInObjects: [
                ...prevData.setCustomDataInObjects,
                {
                    addInfoType: "",
                    tagName: "",
                    tagValue: "",
                },
            ],
        }));
    };

    // Xử lý xóa custom data field
    const removeCustomDataField = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            setCustomDataInObjects: prevData.setCustomDataInObjects.filter((_, i) => i !== index),
        }));
    };

    // Xử lý thay đổi custom data field
    const handleCustomDataChange = (index, field, value) => {
        setFormData((prevData) => {
            const updatedCustomData = [...prevData.setCustomDataInObjects];
            updatedCustomData[index] = {
                ...updatedCustomData[index],
                [field]: value,
            };
            return {
                ...prevData,
                setCustomDataInObjects: updatedCustomData,
            };
        });
    };

    // Xử lý submit form
    const handleSubmit = async () => {
        const cleanedFormData = {
            ...formData,
            setCustomDataInObjects: formData.setCustomDataInObjects.filter(
                ({ addInfoType, tagName, tagValue }) => addInfoType || tagName || tagValue
            ),
        };

        try {
            let response;
            switch (subject) {
                case "clients":
                    response = await editClient(cleanedFormData);
                    break;
                case "contracts":
                    response = await editContract(cleanedFormData);
                    break;
                default:
                    console.warn(`Unhandled subject: ${subject}`);
                    return;
            }

            setMessage(response?.message || "Chỉnh sửa thành công.");
            setSuccess(response?.success ?? true);
            setResponseData(response?.data ?? null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Có lỗi xảy ra.";
            const errorSuccess = error.response?.data?.success ?? false;

            setMessage(errorMessage);
            setSuccess(errorSuccess);
            setResponseData(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-2xl w-full md:w-2/3 md:h-auto relative overflow-y-auto max-h-[90vh]"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                >
                    <X className="w-6 h-6 text-gray-500" />
                </button>

                <div className="p-layout">
                    <div>
                        <h2 className="text-xl font-bold mb-4">{entityConfig.title}</h2>
                    </div>

                    <div className="grid gap-4 grid-cols-4">
                        {message && (
                            <div
                                className={`p-2 col-span-4 border rounded-md 
                                ${success ? "border-green-500 bg-green-300 text-green-700" : "border-red-500 bg-red-300 text-red-700"}`}
                            >
                                {message}
                            </div>
                        )}
                        {entityConfig.fields.map((field) => (
                            <FormInput
                                key={field.id}
                                label={field.label}
                                value={getValueByPath(formData, field.path)}
                                onChange={(e) => handleFieldChange(field.path, e.target.value)}
                                placeholder={field.placeholder || ""}
                                required={field.required}
                            />
                        ))}
                    </div>

                    {/* Custom Data Section */}
                    {entityConfig.hasCustomData && (
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Dữ liệu tùy chọn</h3>
                                <CommonButton
                                    onClick={addCustomDataField}
                                    className="flex items-center px-4 py-2 !w-40"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Thêm trường
                                </CommonButton>
                            </div>

                            {formData.setCustomDataInObjects.length > 0 ? (
                                formData.setCustomDataInObjects.map((item, index) => (
                                    <div key={index} className="grid grid-cols-7 gap-3 mb-3 items-end">
                                        <div className="col-span-2">
                                            <FormInput
                                                label="Add Info Type"
                                                value={item.addInfoType}
                                                onChange={(e) =>
                                                    handleCustomDataChange(index, "addInfoType", e.target.value)
                                                }
                                                placeholder={`AddInfo01`}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <FormInput
                                                label="Tag Name"
                                                value={item.tagName}
                                                onChange={(e) =>
                                                    handleCustomDataChange(index, "tagName", e.target.value)
                                                }
                                                placeholder={`PrevID_01`}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <FormInput
                                                label="Tag Value"
                                                value={item.tagValue}
                                                onChange={(e) =>
                                                    handleCustomDataChange(index, "tagValue", e.target.value)
                                                }
                                                placeholder={`A1`}
                                            />
                                        </div>
                                        <div className="col-span-1 flex items-center justify-center h-full pt-4">
                                            <button
                                                onClick={() => removeCustomDataField(index)}
                                                className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 w-full flex items-center justify-center"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">
                                    Chưa có trường dữ liệu tùy chọn. Nhấn "Thêm trường" để bổ sung.
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-row-reverse justify-between mt-6">
                        <CommonButton className="w-40" onClick={handleSubmit}>
                            Lưu
                        </CommonButton>
                    </div>
                </div>
            </div>
        </div>
    );
}