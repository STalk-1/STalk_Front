import api from '@/apis/base/axios';
import type { TopStocksResponse } from '@/apis/main/types';

const getTopStocks = async () => {
  const { data } = await api.get<TopStocksResponse>('/stocks/top10');
  return data;
};

export { getTopStocks };
