import { Link } from 'react-router-dom';

import { Logo } from '@/assets/images';

import LoginButton from './LoginButton';

function Header() {
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
        <LoginButton />
      </nav>
    </header>
  );
}

export default Header;
