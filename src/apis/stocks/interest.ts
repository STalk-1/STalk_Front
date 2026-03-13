import api from '@/apis/base/axios';

const addInterestStock = async (symbol: string) => {
  const { data } = await api.post(`/stocks/favorites/${symbol}`);
  return data;
};

export { addInterestStock };
