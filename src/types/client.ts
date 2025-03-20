export interface Client {
    id: string;
    shortName?: string;
    clientNumber?: string;
    regNumber?: string;
    contracts?: Contract[];
}

export interface Contract {
    contractNumber: string;
    contractType: string;
    subContracts?: Contract[]; // Đệ quy với chính Contract
}
