import api from "@/utils/axiosinstance";
import {CreateClientV4} from "@/types/create";

// export const createClient = async (payload) => {
//     try {
//         const res = await api.post("/clients/create", payload);
//         return res.data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
//
// };

// utils/CreateService.ts
export const createClient = async (payload: CreateClientV4) => {
    try {
        const res = await api.post("/clients/create", payload);
        return res.data;
    } catch(error) {
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
