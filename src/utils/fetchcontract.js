import api from "@/utils/axiosinstance";

export const fetchContractByNumber = async (contractNumber) => {
    try {
        const payload = {
            contractNumber: contractNumber, // Dựa trên GetContractByNumberV2
        };
        const res = await api.post("/contracts/getContractByNumber", payload);
        return res.data;
    } catch (error) {
        console.error("Error fetching contract by number:", error);
        throw error;
    }
};

export const fetchContractsByClient = async (clientIdentifier) => {
    try {
        const payload = {
            clientSearchMethod: "CLIENT_NUMBER", // Hardcode hoặc có thể làm động sau
            clientIdentifier: clientIdentifier, // Dựa trên GetContractsByClientV2
        };
        const res = await api.post("/contracts/getContractsByClient", payload);
        return res.data;
    } catch (error) {
        console.error("Error fetching contracts by client:", error);
        throw error;
    }
};