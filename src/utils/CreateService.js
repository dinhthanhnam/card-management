import api from "@/utils/axiosinstance";

export const createClient = async (payload) => {
    try {
        const res = await api.post("/clients/create", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

};

export const createCard = async (payload) => {
    try {
        const res = await api.post("/cards/create", payload);
        return res.data;
    } catch(error) {
        console.log(error);
        throw error;
    }

};

export const createContract = async (payload) => {
    try {
        const res = await api.post("/contracts/create", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

};

export const createIssuingContractWithLiability = async (payload) => {
    try {
        const res = await api.post("/contracts/createIssuingWithLiability", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

};
