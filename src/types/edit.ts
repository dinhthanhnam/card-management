import {SetCustomDataInObject} from "@/types/create";

export interface EditClientV6 {
    clientSearchMethod: string;
    clientIdentifier: string;
    reason?: string;
    editClientInObject: EditClientInObject;
    setCustomDataInObjects: SetCustomDataInObject[];
}

export interface EditClientInObject {
    branch?: string;
    clientCategory?: string;
    serviceGroup?: string;
    productCategory?: string;
    clientTypeCode?: string;
    shortName?: string;
    salutationCode?: string;
    salutationSuffix?: string;
    gender?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthDate?: string;
    birthPlace?: string;
    birthName?: string;
    languageCode?: string;
    citizenShip?: string;
    maritalStatusCode?: string;
    taxBracket?: string;
    individualTaxpayerNumber?: string;
    dateExpire?: string;
    homePhone?: string;
    mobilePhone?: string;
    businessPhone?: string;
    homeFax?: string;
    businessFax?: string;
    email?: string;
    country?: string;
    state?: string;
    city?: string;
    addressZip?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    companyName?: string;
    trademark?: string;
    department?: string;
    positionCode?: string;
    profession?: string;
    embossedLastName?: string;
    embossedFirstName?: string;
    embossedCompanyName?: string;
    embossedTitleCode?: string;
    identityCardType?: string;
    identityCardNumber?: string;
    identityCardDetails?: string;
    clientNumber?: string;
    secretPhrase?: string;
    socialSecurityNumber?: string;
    addDate01?: string;
    addDate02?: string;
    registrationDate?: string;
}

export interface EditContractV4 {
    contractSearchMethod: string;
    contractIdentifier: string;
    reason?: string;
    editContractInObject: EditContractInObject;
    setCustomDataInObjects: SetCustomDataInObject[];
}

export interface EditContractInObject {
    branch?: string;
    serviceGroup?: string;
    contractNumber?: string;
    contractName?: string;
    cbsID?: string;
    cbsNumber?: string;
    closeDate?: string;
}