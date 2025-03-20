import api from "@/utils/axiosinstance";
// import {Client, Contract} from "@/types/client";

export const fetchBasicClientContracts = async (payload) => {
    const response = await api.post("/clients/contracts", payload);
    return response.data;

}
