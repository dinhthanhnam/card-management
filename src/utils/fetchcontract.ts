import api from "@/utils/axiosinstance";
import { Contract } from "@/type/Contract"; // Giả sử bạn đã định nghĩa interface Contract

// Interface chung cho dữ liệu trả về từ API
interface ApiResponse {
    success: boolean;
    message: string;
    statusCode: number;
    contracts: Contract[];
}

// Interface cho fetchContractByNumber (mảng contracts thường chỉ có 1 phần tử hoặc rỗng)
interface FetchContractByNumberResult extends ApiResponse {}

// Interface cho fetchContractsByClient (mảng contracts có thể có nhiều phần tử)
interface FetchContractsByClientResult extends ApiResponse {}

export const fetchContractByNumber = async (contractNumber: string): Promise<FetchContractByNumberResult> => {
    try {
        const payload = {
            contractNumber: contractNumber, // Dựa trên GetContractByNumberV2
        };
        const res = await api.post("/contracts/getContractByNumber", payload);
        return res.data as FetchContractByNumberResult;
    } catch (error) {
        console.error("Error fetching contract by number:", error);
        throw error;
    }
};

export const fetchContractsByClient = async (clientIdentifier: string): Promise<FetchContractsByClientResult> => {
    try {
        const payload = {
            clientSearchMethod: "CLIENT_NUMBER", // Hardcode hoặc có thể làm động sau
            clientIdentifier: clientIdentifier, // Dựa trên GetContractsByClientV2
        };
        const res = await api.post("/contracts/getContractsByClient", payload);
        return res.data as FetchContractsByClientResult;
    } catch (error) {
        console.error("Error fetching contracts by client:", error);
        throw error;
    }
};