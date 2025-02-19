import axios from "axios";
import api from "@/utils/axiosinstance";

export const modalrequest = async (subject, id) => {
  try {
    const token = localStorage.getItem("jwt"); // Lấy token từ localStorage

    const res = await api.get(`/${subject}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Chèn JWT vào header
      },
    });

    return res.data;
  } catch (error) {
    console.error("Fetch data failed:", error.response?.data || error.message);
    return null;
  }
};
