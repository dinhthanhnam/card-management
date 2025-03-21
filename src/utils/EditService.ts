import api from "@/utils/axiosinstance";
import {EditClientV6, EditContractV4} from "@/types/edit";

export const editClient = async (payload: EditClientV6) => {
    try {
        const res = await api.put("/clients/edit", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const editContract = async (payload: EditContractV4) => {
    try {
        const res = await api.put("/contracts/edit", payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};