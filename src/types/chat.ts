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

type ChatCountPayload = {
  symbol: string;
  count: number;
};

export type { ChatCountPayload, ChatMessagePayload, ChatSendPayload };
