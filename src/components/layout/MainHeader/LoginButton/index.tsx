import { useState } from 'react';

import { getKakaoLoginUrl } from '@/apis/auth/kakao';
import { HEADER_ACTION_TEXTS } from '@/components/layout/MainHeader/constants';

function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const loginUrl = await getKakaoLoginUrl();
      window.location.href = loginUrl;
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={isLoading}
      className="typo-16-medium md:typo-20-medium lg:typo-20-medium ml-auto rounded-lg bg-green-500 px-5 py-2 text-white"
    >
      {HEADER_ACTION_TEXTS.LOGIN}
    </button>
  );
}

export default LoginButton;
