type ChatSendPayload = {
  symbol: string;
  sender: string;
  content: string;
};

type ChatMessagePayload = {
  messageId: string;
  symbol: string;
  content: string;
  sender: string;
  sentAt: string;
};

export type { ChatMessagePayload, ChatSendPayload };
