// components/modal/CreateModalConfig.ts
import { ClientFormData, CardFormData, ContractFormData, IssuingContractFormData } from "@/type/CreateFormData";

interface FieldConfig<T> {
    id: keyof T; // Key của field trong FormData
    label: string;
    placeholder?: string;
    required?: boolean;
}

interface SubjectConfig<T> {
    title: string;
    fields: FieldConfig<T>[];
    hasCustomData: boolean;
    initialData: T;
    buildPayload: (data: T) => any; // Hàm chuyển form data thành payload cho API
}

export const ENTITY_CONFIGS: {
    clients: SubjectConfig<ClientFormData>;
    cards: SubjectConfig<CardFormData>;
    contracts: SubjectConfig<ContractFormData>;
    issuingContract: SubjectConfig<IssuingContractFormData>;
} = {
    clients: {
        title: "Tạo Khách Hàng",
        fields: [
            { id: "reason", label: "Lý do", placeholder: "Tạo khách hàng" },
            { id: "shortName", label: "Tên ngắn", placeholder: "Nguyen Van A" },
            { id: "firstName", label: "Tên", placeholder: "Van A" },
            { id: "lastName", label: "Họ", placeholder: "Nguyen" },
            { id: "email", label: "Email", placeholder: "email@example.com" },
            { id: "mobilePhone", label: "Số điện thoại", placeholder: "0123456789", required: true },
            { id: "branch", label: "Chi nhánh", placeholder: "Hà Nội", required: true },
        ],
        hasCustomData: true,
        initialData: {
            reason: "",
            shortName: "",
            firstName: "",
            lastName: "",
            email: "",
            mobilePhone: "",
            branch: "",
            customData: [],
        },
        buildPayload: (data) => ({
            reason: data.reason,
            createClientInObject: {
                shortName: data.shortName,
                firstName: data.firstName,
                lastName: data.lastName,
                eMail: data.email,
                mobilePhone: data.mobilePhone,
                branch: data.branch,
            },
            setCustomDataInObjects: data.customData.map((item) => ({
                addInfoType: item.type,
                tagName: item.name,
                tagValue: item.value,
            })),
        }),
    },
    cards: {
        title: "Tạo Thẻ",
        fields: [
            { id: "reason", label: "Lý do", placeholder: "Tạo thẻ" },
            { id: "contractIdentifier", label: "Mã hợp đồng", placeholder: "CON123", required: true },
            { id: "productCode", label: "Mã sản phẩm", placeholder: "PROD001", required: true },
            { id: "cardName", label: "Tên thẻ", placeholder: "Thẻ cá nhân", required: true },
        ],
        hasCustomData: true,
        initialData: {
            reason: "",
            contractIdentifier: "",
            productCode: "",
            cardName: "",
            customData: [],
        },
        buildPayload: (data) => ({
            reason: data.reason,
            contractIdentifier: data.contractIdentifier,
            productCode: data.productCode,
            createCardInObject: {
                CardName: data.cardName,
            },
            setCustomDataInObjects: data.customData.map((item) => ({
                addInfoType: item.type,
                tagName: item.name,
                tagValue: item.value,
            })),
        }),
    },
    // Tương tự cho contracts và issuingContract
    contracts: {
        title: "Tạo Hợp Đồng",
        fields: [
            { id: "reason", label: "Lý do", placeholder: "Tạo hợp đồng" },
            { id: "clientIdentifier", label: "Mã khách hàng", placeholder: "CLI123", required: true },
            { id: "branch", label: "Chi nhánh", placeholder: "Hà Nội", required: true },
            { id: "productCode", label: "Mã sản phẩm", placeholder: "PROD002", required: true },
            { id: "contractName", label: "Tên hợp đồng", placeholder: "Hợp đồng A", required: true },
        ],
        hasCustomData: true,
        initialData: {
            reason: "",
            clientIdentifier: "",
            branch: "",
            productCode: "",
            contractName: "",
            customData: [],
        },
        buildPayload: (data) => ({
            reason: data.reason,
            clientIdentifier: data.clientIdentifier,
            createContractInObject: {
                branch: data.branch,
                productCode: data.productCode,
                contractName: data.contractName,
            },
            setCustomDataInObjects: data.customData.map((item) => ({
                addInfoType: item.type,
                tagName: item.name,
                tagValue: item.value,
            })),
        }),
    },
    issuingContract: {
        title: "Tạo Hợp Đồng Phát Hành",
        fields: [
            { id: "liabContractIdentifier", label: "Mã hợp đồng trách nhiệm", placeholder: "LIAB123", required: true },
            { id: "clientIdentifier", label: "Mã khách hàng", placeholder: "CLI123", required: true },
            { id: "productCode", label: "Mã sản phẩm", placeholder: "PROD003", required: true },
            { id: "branch", label: "Chi nhánh", placeholder: "Hà Nội", required: true },
            { id: "contractName", label: "Tên hợp đồng", placeholder: "Hợp đồng phát hành A", required: true },
        ],
        hasCustomData: true,
        initialData: {
            liabContractIdentifier: "",
            clientIdentifier: "",
            productCode: "",
            branch: "",
            contractName: "",
            customData: [],
        },
        buildPayload: (data) => ({
            liabContractIdentifier: data.liabContractIdentifier,
            clientIdentifier: data.clientIdentifier,
            productCode: data.productCode,
            createIssuingInObject: {
                branch: data.branch,
                contractName: data.contractName,
            },
            setCustomDataInObjects: data.customData.map((item) => ({
                addInfoType: item.type,
                tagName: item.name,
                tagValue: item.value,
            })),
        }),
    },
};