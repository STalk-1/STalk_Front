import { Logo } from '@/assets/images';

function Header() {
  return (
    <header className="border-bg h-20 w-full border-b bg-white">
      <nav className="mx-auto flex h-full w-full max-w-300 items-center justify-between px-5 md:justify-start md:gap-10">
        <h1>
          <Logo width={51} height={24} />
        </h1>
        <ul className="flex items-center gap-6">
          <li className="typo-12-medium relative text-green-500 after:absolute after:-bottom-7 after:left-0 after:h-0.5 after:w-full after:bg-green-500 after:content-['']">
            실시간 차트
          </li>
          <li className="typo-12-medium text-grey-500">관심 종목</li>
        </ul>
        <button
          type="button"
          className="typo-12-medium rounded-lg bg-green-500 px-5 py-2 text-white md:ml-auto"
        >
          로그인
        </button>
      </nav>
    </header>
  );
}

export default Header;
