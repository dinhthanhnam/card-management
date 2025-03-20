// types/create.ts
export interface ClientFormData {
    reason: string;
    shortName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobilePhone: string;
    branch: string;
    customData: CustomData[];
}

export interface CardFormData {
    reason: string;
    contractIdentifier: string;
    productCode: string;
    cardName: string;
    customData: CustomData[];
}

export interface ContractFormData {
    reason: string;
    clientIdentifier: string;
    branch: string;
    productCode: string;
    contractName: string;
    customData: CustomData[];
}

export interface IssuingContractFormData {
    liabContractIdentifier: string;
    clientIdentifier: string;
    productCode: string;
    branch: string;
    contractName: string;
    customData: CustomData[];
}

export interface CustomData {
    addInfoType: string;
    tagName: string;
    tagValue: string;
}