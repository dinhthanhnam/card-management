import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.warn("JWT expired, clearing token...");
            localStorage.removeItem("jwt");
            window.location.href = "/login"; // Redirect về trang đăng nhập
        }
        return Promise.reject(error);
    }
);

export default api;
