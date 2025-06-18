import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

export const chatApi = axios.create({
  baseURL: `${backendUrl}/chat`,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true // 쿠키를 포함하여 요청
});

export const sendMessage = async (roomId: string, message: string) => {
  try {
    const response = await chatApi.post("/send", { roomId, message });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const fetchMessages = async (roomId: string) => {
  try {
    const response = await chatApi.get(`/messages/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
