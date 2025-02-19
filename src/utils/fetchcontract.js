import api from "@/utils/axiosinstance";

export const fetchContract = async (id = null) => {
    try {
        const token = localStorage.getItem("jwt");
        const url = id ? `/contracts/${id}` : `/contracts`;
        const res = await api.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching contract:", error);
        throw error;
    }
};
