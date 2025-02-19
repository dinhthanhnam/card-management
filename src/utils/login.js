import api from "@/utils/axiosinstance";

export const login = async (email, password) => {
    try {
        const res = await api.post("/auth/authenticate", { email, password });

        res.data.token && localStorage.setItem("jwt", res.data.token);

        return res.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return null;
    }
};
