import api from "@/utils/axiosinstance";

export const fetchCard = async (id = null) => {
    try {
        const url = id ? `/cards/${id}` : "/cards";
        const res = await api.get(url);
        return res.data;
    } catch (error) {
        console.error("Error fetching card:", error);
        throw error;
    }
};
