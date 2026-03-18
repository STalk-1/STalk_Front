type ChatSender = 'sender';

type ChatMessage = {
  id: number;
  sender: ChatSender;
  text: string;
  time: string;
  author?: string;
};

type ChatMessageListProps = {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export type { ChatMessage, ChatMessageListProps, ChatSender };
