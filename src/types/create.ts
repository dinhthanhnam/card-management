// Định nghĩa interface cho SetCustomDataInObject
export interface SetCustomDataInObject {
    addInfoType: string;
    tagName: string;
    tagValue: string;
}

// Định nghĩa interface cho CreateClientInObject
export interface CreateClientInObject {
    institutionCode?: string;
    branch?: string;
    clientTypeCode?: string;
    clientCategory?: string;
    serviceGroup?: string;
    productCategory?: string;
    languageCode?: string;
    salutationSuffix?: string;
    shortName?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    maritalStatusCode?: string;
    socialSecurityNumber?: string;
    salutationCode?: string;
    birthDate?: string;
    gender?: string;
    birthPlace?: string;
    birthName?: string;
    citizenship?: string;
    taxBracket?: string;
    individualTaxpayerNumber?: string;
    secretPhrase?: string;
    companyName?: string;
    department?: string;
    embossedTitleCode?: string;
    embossedFirstName?: string;
    embossedLastName?: string;
    embossedCompanyName?: string;
    identityCardType?: string;
    identityCardNumber?: string;
    identityCardDetails?: string;
    clientNumber?: string;
    profession?: string;
    email?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    city?: string;
    homePhone?: string;
    mobilePhone?: string;
    businessPhone?: string;
}

// Định nghĩa interface cho CreateClientV4
export interface CreateClientV4 {
    reason?: string;
    createClientInObject: CreateClientInObject;
    setCustomDataInObjects: SetCustomDataInObject[];
}

export interface CreateContractV2 {
    clientSearchMethod: string;
    clientIdentifier: string;
    reason?: string;
    createContractInObject: CreateContractInObject;
    setCustomDataInObjects: SetCustomDataInObject[];
}

export interface CreateContractInObject {
    institutionCode: string;
    branch: string;
    productCode: string;
    productCode2?: string;
    productCode3?: string;
    contractName: "Liability Contract" | "Issuing Contract" | "Card Contract";
    cbsNumber?: string;
}

export interface CreateIssuingContractWithLiabilityV2 {
    liabCategory: string;
    liabSearchMethod: string;
    liabContractIdentifier: string;
    clientSearchMethod: string;
    clientIdentifier: string;
    productCode: string;
    productCode2?: string;
    productCode3?: string;
    createIssuingInObject: CreateIssuingInObject;
}

export interface CreateIssuingInObject {
    institutionCode: string;
    branch: string;
    contractName: "Liability Contract" | "Issuing Contract" | "Card Contract";
    cbsNumber?: string;
    addInfo01?: string;
    addInfo02?: string;
}

export interface CreateCardV3 {
    contractSearchMethod: string;
    contractIdentifier: string;
    productCode: string;
    productCode2?: string;
    productCode3?: string;
    createCardInObject: CreateCardInObject;
}

export interface CreateCardInObject {
    cardName: string;
    cbsNumber?: string;
    embossedFirstName: string;
    embossedLastName: string;
    embossedCompanyName?: string;
}