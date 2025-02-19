import axios from "axios";
import { API_ENDPOINTS } from "@/constants/ApiEndpoints";

export const fetchContract = async (id = null, token) => {
    try {
        const url = id ? `${API_ENDPOINTS.CLIENTS}/${id}` : API_ENDPOINTS.CLIENTS;
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching client:", error);
        throw error;
    }
};
