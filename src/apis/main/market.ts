import api from '@/apis/base/axios';
import type { MarketResponse } from '@/apis/main/types';

const getMarketIndices = async () => {
  const { data } = await api.get<MarketResponse>('/market');
  return data;
};

export { getMarketIndices };
