import { API_ENDPOINTS } from "@/constants/ApiEndpoints";

export const login = async (email, password) => {
    try {
        const res = await fetch(API_ENDPOINTS.AUTHENTICATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            console.error("Login failed:", res.status);
            return null;
        }

        const data = await res.json();
        localStorage.setItem("jwt", data.token); // Lưu token vào localStorage
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
};
