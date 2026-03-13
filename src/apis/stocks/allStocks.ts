import api from '@/apis/base/axios';

import type { AllStocksResponse } from './types';

const getAllStocks = async () => {
  const { data } = await api.get<AllStocksResponse>('/stocks/overview');
  return data;
};

export { getAllStocks };
export type { AllStocksResponse };
