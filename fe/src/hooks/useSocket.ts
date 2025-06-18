import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  roomId: string;
  sender: string;
  content: string;
  createdAt?: string;
}

interface UseSocketReturn {
  socket: Socket | null;
  messages: Message[];
  sendMessage: (msg: Omit<Message, "createdAt">) => void;
  isConnected: boolean;
  loading: boolean;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useSocket = (roomId: string): UseSocketReturn => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      return;
    }
    if (!roomId) return;

    const socket = io(backendUrl, { withCredentials: true });
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("joinRoom", roomId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("receive_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("서버에 연결할 수 없습니다.");
    });

    setTimeout(() => setLoading(false), 1000);

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = useCallback((msg: Omit<Message, "createdAt">) => {
    if (!socketRef.current) return;
    socketRef.current.emit("send_message", msg, (ack: { success: boolean }) => {
      if (!ack?.success) {
        setError("메시지 전송 실패");
      }
    });
  }, []);

  return {
    socket: socketRef.current,
    messages,
    sendMessage,
    isConnected,
    loading,
    error,
    setError
  };
};
