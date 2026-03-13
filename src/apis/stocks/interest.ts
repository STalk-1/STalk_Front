import api from '@/apis/base/axios';
import type { FavoriteStocksResponse } from '@/apis/stocks/types';

const getInterestStocks = async () => {
  const { data } = await api.get<FavoriteStocksResponse>('/stocks/favorites');
  return data;
};

const addInterestStock = async (symbol: string) => {
  const { data } = await api.post(`/stocks/favorites/${symbol}`);
  return data;
};

export { addInterestStock, getInterestStocks };
