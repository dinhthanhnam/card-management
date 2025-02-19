import api from "@/utils/axiosinstance";

export const fetchClientContracts = async (clientId) => {
    try {
        const token = localStorage.getItem("jwt");
        const res = await api.get(`/contracts/client/${clientId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching client contracts:", error);
        throw error;
    }
};