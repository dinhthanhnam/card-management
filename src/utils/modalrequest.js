import axios from "axios";
import api from "@/utils/axiosinstance";

export const modalrequest = async (subject, id) => {
  try {
    const res = await api.get(`/${subject}/${id}`);

    return res.data;
  } catch (error) {
    console.error("Fetch data failed:", error.response?.data || error.message);
    return null;
  }
};
