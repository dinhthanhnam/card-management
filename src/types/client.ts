interface Client {
    id: number;
    shortName?: string;
    clientNumber?: string;
    regNumber?: string;
    [key: string]: any; // For any additional properties
}