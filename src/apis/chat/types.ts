type ChatRoomInfo = {
  symbol: string;
  name: string;
  market: string;
};

type ChatRoomCount = {
  symbol: string;
  count: number;
};

type ChatApiResponse<T> = {
  status: string;
  message: string;
  data: T;
  timestamp: string;
};

export type { ChatApiResponse, ChatRoomCount, ChatRoomInfo };
