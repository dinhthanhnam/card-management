import api from "@/utils/axiosinstance";

export const login = async (email, password) => {
    try {
        const res = await api.post("/auth/authenticate", { email, password });

        if(res.data)
        {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        return res.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return null;
    }
};
