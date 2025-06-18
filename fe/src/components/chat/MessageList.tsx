import React from "react";
import { formatTimestamp } from "@/utils/formatDate";
import InfiniteScroll from "react-infinite-scroll-component";

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
  loadMore?: () => void;
  hasMore?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  loadMore,
  hasMore
}) => {
  return (
    <div id="scrollableDiv" className="flex-1 overflow-y-auto p-4">
      <InfiniteScroll
        dataLength={messages.length}
        next={loadMore ?? (() => {})}
        hasMore={hasMore ?? true}
        inverse={true}
        scrollableTarget="scrollableDiv"
        loader={<div className="text-center">로딩 중...</div>}
      >
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="text-sm text-gray-500">
              {formatTimestamp(message.timestamp)}
            </div>
            <div className="font-bold">{message.sender}</div>
            <div className="text-gray-800">{message.content}</div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MessageList;
