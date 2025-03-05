// Cập nhật fetchClient để hỗ trợ phân trang
import api from "@/utils/axiosinstance";

export const fetchClient = async (page = 0, size = 10) => {
    try {
        const res = await api.get("/clients", {
            params: {
                page,
                size
            }
        });
        return res.data; // Giả định API trả về { content: [], totalPages: number, ... }
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
};