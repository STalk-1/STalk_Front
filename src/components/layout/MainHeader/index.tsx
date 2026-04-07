import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getMe } from '@/apis/users/me';
import { ImgProfile, Logo } from '@/assets/images';

import LoginButton from './LoginButton';

function Header() {
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchMe = async () => {
      try {
        const me = await getMe();
        if (!mounted) {
          return;
        }

        setDisplayName(me.nickname || null);
      } catch {
        if (!mounted) {
          return;
        }

        setDisplayName(null);
      }
    };

    fetchMe();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <header className="relative h-20 w-full bg-white shadow-xl">
      <nav className="layout-content flex h-full w-full items-center px-5">
        <h1>
          <Link to="/" aria-label="홈으로 이동">
            <Logo
              className="md:h-9 md:w-19 lg:h-9 lg:w-19"
              width={60}
              height={30}
            />
          </Link>
        </h1>
        {displayName ? (
          <div className="ml-auto flex items-center gap-2">
            <ImgProfile className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true" />
            <p className="typo-16-medium md:typo-20-medium lg:typo-20-medium text-grey-800">
              {displayName}
            </p>
          </div>
        ) : (
          <LoginButton />
        )}
      </nav>
    </header>
  );
}

export default Header;
