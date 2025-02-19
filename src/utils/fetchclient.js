import api from "@/utils/axiosinstance";

export const fetchClient = async (id = null) => {
    try {
        const token = localStorage.getItem("jwt");
        const res = await api.get("/clients", {
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
