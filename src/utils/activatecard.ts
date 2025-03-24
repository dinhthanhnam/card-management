import api from "@/utils/axiosinstance";

export const activateCard = async (payload) => {
    try {
        const res = await api.post("/cards/activate", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const setCardStatus = async (payload) => {
    try {
        const res = await api.post("/cards/set-status", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}