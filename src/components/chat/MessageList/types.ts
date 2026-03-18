type ChatSender = 'sender';

type ChatMessage = {
  id: string;
  sender: ChatSender;
  text: string;
  time: string;
  author?: string;
};

type ChatMessageListProps = {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  currentUserName?: string | null;
};

export type { ChatMessage, ChatMessageListProps, ChatSender };
