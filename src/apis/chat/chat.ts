import api from '@/apis/base/axios';
import type { ChatMessagePayload } from '@/types/chat';

import type { ChatApiResponse, ChatRoomCount, ChatRoomInfo } from './types';

const getChatRoomInfo = async (symbol: string) => {
  const { data } = await api.get<ChatApiResponse<ChatRoomInfo>>(
    `/chat/rooms/${symbol}/info`
  );
  return data.data;
};

const getChatRoomCount = async (symbol: string) => {
  const { data } = await api.get<ChatApiResponse<ChatRoomCount>>(
    `/chat/rooms/${symbol}/count`
  );
  return data.data;
};

const getChatRoomHistory = async (symbol: string) => {
  const { data } = await api.get<ChatApiResponse<ChatMessagePayload[]>>(
    `/chat/rooms/${symbol}/history`
  );
  return data.data;
};

export { getChatRoomCount, getChatRoomHistory, getChatRoomInfo };
