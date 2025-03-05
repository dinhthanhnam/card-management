import api from "@/utils/axiosinstance";

export const fetchClientContracts = async (clientId, page = 0, size = 10) => {
    try {
        const res = await api.get(`/contracts/client/${clientId}`, {
            params: { page, size },
        });
        return res.data; // { content: [], totalPages: number, ... }
    } catch (error) {
        console.error("Error fetching client contracts:", error.response?.data || error.message);
        throw error;
    }
};