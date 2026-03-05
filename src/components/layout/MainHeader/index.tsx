import { Logo } from '@/assets/images';

import { HEADER_NAV_TEXTS } from './constants';
import LoginButton from './LoginButton';

function Header() {
  return (
    <header className="border-bg h-20 w-full border-b bg-white">
      <nav className="mx-auto flex h-full w-full max-w-300 items-center gap-10 px-5">
        <h1>
          <Logo
            className="md:h-9 md:w-19 lg:h-9 lg:w-19"
            width={51}
            height={24}
          />
        </h1>
        <ul className="flex h-full items-center gap-6">
          <li className="typo-12-medium md:typo-20-medium lg:typo-20-medium relative flex h-full items-center text-green-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500 after:content-['']">
            {HEADER_NAV_TEXTS.REAL_TIME_CHART}
          </li>
          <li className="typo-12-medium text-grey-500 md:typo-20-medium lg:typo-20-medium">
            {HEADER_NAV_TEXTS.INTEREST_STOCKS}
          </li>
        </ul>
        <LoginButton />
      </nav>
    </header>
  );
}

export default Header;
