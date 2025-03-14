import { X, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormInput from "@/components/common/FormInput";
import CommonBottom from "@/components/common/CommonBottom";
import {createClient, createCard, createContract, createIssuingContractWithLiability} from "@/utils/CreateService";
// Các config cho từng loại đối tượng
const ENTITY_CONFIGS = {
    clients: {
        title: "Create Client",
        fields: [
            { id: "reason", label: "Reason", path: "reason" , placeholder: "Creat client"},
            { id: "createClientInObject.shortName", label: "Short Name", path: "createClientInObject.shortName" },
            { id: "createClientInObject.firstName", label: "First Name", path: "createClientInObject.firstName" },
            { id: "createClientInObject.lastName", label: "Last Name", path: "createClientInObject.lastName" },
            { id: "createClientInObject.eMail", label: "Email", path: "createClientInObject.eMail" },
            { id: "createClientInObject.martialStatusCode", label: "Martial Status", path: "createClientInObject.martialStatusCode", placeholder: "D" },
            { id: "createClientInObject.institutionCode", label: "Institution Code", path: "createClientInObject.institutionCode", placeholder: "0001" , required: true },
            { id: "createClientInObject.branch", label: "Branch", path: "createClientInObject.branch" , placeholder: "0101", required: true },
            { id: "createClientInObject.mobilePhone", label: "Mobile Phone", path: "createClientInObject.mobilePhone", placeholder: "10 digits", required: true },
            { id: "createClientInObject.identityCardNumber", label: "Identity Card Number", path: "createClientInObject.identityCardNumber", placeholder: "10 digits", required: true },
            { id: "createClientInObject.clientNumber", label: "Client Number", path: "createClientInObject.clientNumber", placeholder: "13 digits", required: true },
            { id: "createClientInObject.clientTypeCode", label: "Client Type Code", path: "createClientInObject.clientTypeCode", placeholder: "PR", required: true },
            { id: "createClientInObject.individualTaxpayerNumber", label: "Individual Taxpayer Number", path: "createClientInObject.individualTaxpayerNumber", placeholder: "12 digits", required: true},
            { id: "createClientInObject.addressLine1", label: "Address Line 1", path: "createClientInObject.addressLine1", placeholder: "Ha Noi Viet Nam"},
            { id: "createClientInObject.citizenship", label: "Citizenship", path: "createClientInObject.citizenship", placeholder: "VNM"},
            { id: "createClientInObject.companyName", label: "Company Name", path: "createClientInObject.companyName", placeholder: "OpenWay"},
            { id: "createClientInObject.salutationCode", label: "Salutation Code", path: "createClientInObject.salutationCode", placeholder: "MR", required: true },
            { id: "createClientInObject.embossedFirstName", label: "Embossed First Name", path: "createClientInObject.embossedFirstName", required: true },
            { id: "createClientInObject.embossedLastName", label: "Embossed Last Name", path: "createClientInObject.embossedLastName", required: true },
        ],
        hasCustomData: true
    },
    contracts: {
        title: "Create Contract",
        fields: [
            // Định nghĩa các trường cho cards ở đây
            { id: "reason", label: "Reason", path: "reason"},
            { id: "clientSearchMethod", label: "Client Search Method", path: "clientSearchMethod", placeholder: "CLIENT_NUMBER", disable: true },
            { id: "clientIdentifier", label: "Client Identifier", path: "clientIdentifier", placeholder: "Client Number", required: true },
            { id: "createContractInObject.branch", label: "Branch", path: "createContractInObject.branch", placeholder: "0101", required: true },
            { id: "createContractInObject.institutionCode", label: "Institution Code", path: "createContractInObject.institutionCode", placeholder: "0001", required: true },
            { id: "createContractInObject.productCode", label: "Product Code", path: "createContractInObject.productCode", placeholder: "ISS_CR_P_LIB", required: true },
            { id: "createContractInObject.contractName", label: "Contract Name", path: "createContractInObject.contractName", placeholder: "Liability Contract", required: true },
            { id: "createContractInObject.cbsNumber", label: "CBS Number", path: "createContractInObject.cbsNumber", required: true, placeholder: "10 digits" },
        ],
        hasCustomData: true
    },
    cards: {
        title: "Create Card",
        fields: [
            { id: "contractSearchMethod", label: "Contract Search Method", path: "contractSearchMethod", placeholder: "CONTRACT_NUMBER", required: true },
            { id: "contractIdentifier", label: "Contract Identifier", path: "contractIdentifier", placeholder: "0xx-MCR-xxxxxxxx", required: true },
            { id: "productCode", label: "Product Code", path: "productCode", placeholder: "MC_CR_GLD_M" },
            { id: "createCardInObject.CardName", label: "Card Name", path: "createCardInObject.CardName", placeholder: "Card Contract", required: true },
            { id: "createCardInObject.cbsNumber", label: "CBS Number", path: "createCardInObject.cbsNumber" },
            { id: "createCardInObject.embossedFirstName", label: "Embossed First Name", path: "createCardInObject.embossedFirstName" },
            { id: "createCardInObject.embossedLastName", label: "Embossed Last Name", path: "createCardInObject.embossedLastName" },
            { id: "createCardInObject.EmbossedCompanyName", label: "Embossed Company Name", path: "createCardInObject.EmbossedCompanyName" },

        ],
        hasCustomData: true
    },
    issuingContract: {
        title: "Create Issuing Contract with Liability",
        fields: [
            // Định nghĩa các trường cho cards ở đây
            { id: "liabCategory", label: "Liability Category", path: "liabCategory", placeholder: "Y", required: true },
            { id: "liabContractSearchMethod", label: "Contract Search Method", path: "liabContractSearchMethod", placeholder: "CONTRACT_NUMBER", required: true },
            { id: "liabContractIdentifier", label: "Contract Identifier", path: "liabContractIdentifier", placeholder: "001-P-LIB-2810963869", required: true },
            { id: "clientSearchMethod", label: "Client Search Method", path: "clientSearchMethod", placeholder: "CLIENT_NUMBER", required: true },
            { id: "clientIdentifier", label: "Client Identifier", path: "clientIdentifier", required: true },
            { id: "productCode", label: "Product Code", path: "productCode", placeholder: "MC_CR_GLD", required: true },
            { id: "productCode2", label: "Product Code 2", path: "productCode2" },
            { id: "productCode3", label: "Product Code 3", path: "productCode3" },
            { id: "createIssuingInObject.branch", label: "Branch", path: "createIssuingInObject.branch", placeholder: "0101", required: true },
            { id: "createIssuingInObject.institutionCode", label: "Institution Code", path: "createIssuingInObject.institutionCode", placeholder: "0001", required: true },
            { id: "createIssuingInObject.contractName", label: "Contract Name", path: "createIssuingInObject.contractName", placeholder: "Issuing Contract", required: true },
            { id: "createIssuingInObject.cbsNumber", label: "CBS Number", path: "createIssuingInObject.cbsNumber"},
            { id: "createIssuingInObject.addInfo01", label: "Add Info 01", path: "createIssuingInObject.addInfo01"},
            { id: "createIssuingInObject.addInfo02", label: "Add Info 02", path: "createIssuingInObject.addInfo02"}
        ],
        hasCustomData: false
    }
};

export default function CreateModal({ onClose, subject }) {
    const modalRef = useRef();
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [responseData, setResponseData] = useState({});
    const entityConfig = ENTITY_CONFIGS[subject] || { title: "", fields: [], hasCustomData: false };

    // Khởi tạo state ban đầu dựa trên template mặc định cho mỗi loại đối tượng
    const getInitialState = () => {
        switch (subject) {
            case "clients":
                return {
                    reason: "",
                    createClientInObject: {},
                    setCustomDataInObjects: []
                };
            case "cards":
                return {
                    reason: "",
                    contractSearchMethod: "",
                    contractIdentifier: "",
                    productCode: "",
                    productCode2: "",
                    productCode3: "",
                    createCardInObject: {},
                    setCustomDataInObjects: []
                };
            case "contracts":
                return {
                    reason: "",
                    clientSearchMethod: "",
                    clientIdentifier: "",
                    createContractInObject: {},
                    setCustomDataInObjects: []
                };
            case "issuingContract":
                return {
                    liabCategory: "",
                    liabContractSearchMethod: "",
                    liabContractIdentifier: "",
                    clientSearchMethod: "",
                    ClientIdentifier: "",
                    productCode: "",
                    productCode2: "",
                    productCode3: "",
                    createIssuingInObject: {},
                    setCustomDataInObjects: []
                }
            default:
                return { setCustomDataInObjects: [] };
        }
    };

    const [formData, setFormData] = useState(getInitialState());

    // Hàm cập nhật giá trị cho trường nested object
    const updateNestedValue = (obj, path, value) => {
        const parts = path.split('.');
        const lastProp = parts.pop();

        // Xây dựng lại object path
        const target = parts.reduce((acc, part) => {
            if (!(part in acc)) acc[part] = {};
            return acc[part];
        }, obj);

        // Cập nhật giá trị
        target[lastProp] = value;
        return { ...obj }; // Return copy để trigger re-render
    };

    // Xử lý onChange cho field
    const handleFieldChange = (path, value) => {
        setFormData(prevData => updateNestedValue({...prevData}, path, value));
    };

    // Lấy giá trị từ path
    const getValueByPath = (obj, path) => {
        return path.split('.').reduce((o, i) => {
            return o && o[i] !== undefined ? o[i] : "";
        }, obj);
    };

    // Xử lý thêm custom data field
    const addCustomDataField = () => {
        setFormData(prevData => ({
            ...prevData,
            setCustomDataInObjects: [
                ...prevData.setCustomDataInObjects,
                {
                    addInfoType: "",
                    tagName: "",
                    tagValue: ""
                }
            ]
        }));
    };

    // Xử lý xóa custom data field
    const removeCustomDataField = (index) => {
        setFormData(prevData => ({
            ...prevData,
            setCustomDataInObjects: prevData.setCustomDataInObjects.filter((_, i) => i !== index)
        }));
    };

    // Xử lý thay đổi custom data field
    const handleCustomDataChange = (index, field, value) => {
        setFormData(prevData => {
            const updatedCustomData = [...prevData.setCustomDataInObjects];
            updatedCustomData[index] = {
                ...updatedCustomData[index],
                [field]: value
            };
            return {
                ...prevData,
                setCustomDataInObjects: updatedCustomData
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
                    response = await createClient(cleanedFormData);
                    break;
                case "cards":
                    response = await createCard(cleanedFormData);
                    break;
                case "contracts":
                    response = await createContract(cleanedFormData);
                    break;
                case "issuingContract":
                    response = await createIssuingContractWithLiability(cleanedFormData);
                    break;
                default:
                    console.warn(`Unhandled subject: ${subject}`);
                    return;
            }

            // 🔹 Nếu request thành công, lấy message từ response
            setMessage(response?.message || "Thao tác thành công.");
            setSuccess(response?.success ?? true);
            setResponseData(response?.data ?? null);

        } catch (error) {
            // 🔹 Nếu request thất bại, vẫn lấy message từ response trả về
            const errorMessage = error.response?.data?.message || "Có lỗi xảy ra.";
            const errorSuccess = error.response?.data?.success ?? false;

            setMessage(errorMessage);
            setSuccess(errorSuccess);
            setResponseData(null);
        }
    };


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
                className="bg-white p-6 rounded-2xl w-full md:w-2/3 md:h-auto relative overflow-y-auto max-h-[90vh]"
            >
                {/* Close button (X) at the top right corner */}
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
                                <CommonBottom
                                    onClick={addCustomDataField}
                                    className="flex items-center px-4 py-2 !w-40"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Thêm trường
                                </CommonBottom>
                            </div>

                            {formData.setCustomDataInObjects.length > 0 ? (
                                formData.setCustomDataInObjects.map((item, index) => (
                                    <div key={index} className="grid grid-cols-7 gap-3 mb-3 items-end">
                                        <div className="col-span-2">
                                            <FormInput
                                                label="Add Info Type"
                                                value={item.addInfoType}
                                                onChange={(e) => handleCustomDataChange(index, "addInfoType", e.target.value)}
                                                placeholder={`AddInfo01`}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <FormInput
                                                label="Tag Name"
                                                value={item.tagName}
                                                onChange={(e) => handleCustomDataChange(index, "tagName", e.target.value)}
                                                placeholder={`PrevID_01`}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <FormInput
                                                label="Tag Value"
                                                value={item.tagValue}
                                                onChange={(e) => handleCustomDataChange(index, "tagValue", e.target.value)}
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
                                <p className="text-gray-500 italic">Chưa có trường dữ liệu tùy chọn. Nhấn "Thêm trường" để bổ sung.</p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-row-reverse justify-between mt-6">
                        <CommonBottom className="w-40" onClick={handleSubmit}>
                            Thêm
                        </CommonBottom>
                    </div>
                </div>
            </div>
        </div>
    );
}