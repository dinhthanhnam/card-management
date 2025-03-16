import api from "@/utils/axiosinstance";

export const editClient = async (payload) => {
    try {
        const res = await api.put("/clients/edit", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const editContract = async (payload) => {
    try {
        const res = await api.put("/contracts/edit", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};