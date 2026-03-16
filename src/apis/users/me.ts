import api from '@/apis/base/axios';

import type { MeResponse } from './types';

const getMe = async () => {
  const { data } = await api.get<MeResponse>('/users/me');
  return data;
};

export { getMe };
export type { MeResponse };
