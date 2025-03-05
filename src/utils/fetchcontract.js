import api from "@/utils/axiosinstance";

export const fetchContract = async (id = null, page = 0, size = 10) => {
    try {
        let url;
        let params = {};

        if (id) {
            // Trường hợp lấy chi tiết hợp đồng theo id
            url = `/contracts/${id}`; // Đảm bảo prefix khớp với backend
        } else {
            // Trường hợp lấy danh sách hợp đồng với phân trang
            url = `/contracts`; // Đảm bảo prefix khớp với backend
            params = { page, size };
        }

        const res = await api.get(url, { params });
        return res.data; // Trả về chi tiết hợp đồng (id) hoặc { content: [], totalPages: number, ... } (danh sách)
    } catch (error) {
        console.error("Error fetching contract:", error.response?.data || error.message);
        throw error;
    }
};