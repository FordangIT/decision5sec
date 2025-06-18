import axios from "axios";

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`/auth/me`, {
      withCredentials: true // 쿠키 포함
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
