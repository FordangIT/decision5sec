//전체 채팅 페이지

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList, { Message } from "@/components/chat/MessageList";
import { useSocket } from "@/hooks/useSocket";
import { fetchMessages } from "@/api/chat";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const ChatRoomPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const { user, loading } = useAuth();

  const socketData = useSocket(roomId as string);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!roomId || typeof roomId !== "string") return;
    const loadMessages = async () => {
      const data = await fetchMessages(roomId);
      setMessages(data);
    };
    loadMessages();
  }, [roomId]);

  useEffect(() => {
    const socket = socketData.socket; // ✅ 여기서 snapshot을 저장
    if (!socket) return;

    const handleReceiveMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [roomId, socketData.socket]);

  // ✅ JSX 내부에서 조건 처리 (Hook 위에는 return 하지 말 것)
  return (
    <div className="flex flex-col h-screen">
      {!router.isReady ? (
        <div>라우터 준비 중...</div>
      ) : loading ? (
        <LoadingSpinner />
      ) : !user ? (
        <div>로그인이 필요합니다</div>
      ) : (
        <>
          <ChatHeader roomId={roomId as string} />
          <MessageList messages={messages} />
          <MessageInput
            onSend={(message) => {
              const socket = socketData.socket;
              if (!socket || !roomId) return;

              socket.emit("sendMessage", {
                roomId,
                content: message,
                sender: user.nickname
              });
            }}
          />
        </>
      )}
    </div>
  );
};

export default ChatRoomPage;
