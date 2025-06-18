//상단 채팅방 정보
import React from "react";

interface ChatHeaderProps {
  roomId: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ roomId }) => {
  return (
    <header className="p-4 bg-blue-500 text-white text-lg font-bold">
      채팅방: {roomId}
    </header>
  );
};

export default ChatHeader;
