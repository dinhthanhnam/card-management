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
    reason: string;
    createClientInObject: CreateClientInObject;
    setCustomDataInObjects: SetCustomDataInObject[];
}