import api from '@/apis/base/axios';

const getKakaoLoginUrl = async () => {
  const { data } = await api.get<string>('/api/auth/kakao/login-url');
  return data;
};

export { getKakaoLoginUrl };
